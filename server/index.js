import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import UserModel from "./models/User.js"; 
import JobsModel from "./models/Jobs.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/school", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        return res.json({ success: false, message: "Email already exists" });
      } else {
        UserModel.create({ name, email, password })
          .then((newUser) => res.json({ success: true, user: newUser }))
          .catch((err) => res.status(500).json({ success: false, message: err.message }));
      }
    })
    .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign(
            { email: email },
            "jwt-access-token-secret-key",
            { expiresIn: "50m" }
          );
          const refreshToken = jwt.sign(
            { email: email },
            "jwt-refresh-token-secret-key",
            { expiresIn: "500m" }
          );
          res.cookie("accessToken", accessToken, {
            maxAge: 3000000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          res.cookie("refreshToken", refreshToken, {
            maxAge: 3000000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          return res.json({ Login: true, user: { name: user.name, email: user.email }, accessToken });
        } else {
          return res.json({ Login: false, message: "Invalid password" });
        }
      } else {
        res.json({ message: "No record found" });
      }
    })
    .catch((err) => res.json(err));
});

const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({ valid: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) {
      return res.status(403).json({ valid: false, message: "Invalid token" });
    } else {
      req.email = decoded.email;
      next();
    }
  });
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshToken) {
    return res.json({ valid: false, message: "No refresh token" });
  } else {
    jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid refresh token" });
      } else {
        const accessToken = jwt.sign(
          { email: decoded.email },
          "jwt-access-token-secret-key",
          { expiresIn: "50m" }
        );
        res.cookie("accessToken", accessToken, {
          maxAge: 300000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        exist = true;
      }
    });
  }
  return exist;
};

app.post("/create/job", verifyUser, (req, res) => {
  const { category, role } = req.body;
  JobsModel.findOne({ category })
    .then((job) => {
      if (job) {
        job.roles.push(role);
        job.save()
          .then((updatedJob) => res.json({ success: true, job: updatedJob }))
          .catch((err) => res.status(500).json({ success: false, message: err.message }));
      } else {
        JobsModel.create({ category, roles: [role] })
          .then((newJob) => res.json({ success: true, job: newJob }))
          .catch((err) => res.status(500).json({ success: false, message: err.message }));
      }
    })
    .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

app.get("/jobs", verifyUser, (req, res) => {
  JobsModel.find()
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(500).json({ success: false, message: err.message }));
});
app.delete("/delete/job/role/:id", verifyUser, (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  JobsModel.findByIdAndUpdate(
    id,
    { $pull: { roles: role } },
    { new: true }
  )
  .then((updatedJob) => {
    if (updatedJob) {
      res.json({ success: true, message: "Role deleted successfully", job: updatedJob });
    } else {
      res.status(404).json({ success: false, message: "Job category not found" });
    }
  })
  .catch((err) => res.status(500).json({ success: false, message: err.message }));
});
app.put("/update/job/role/:id", verifyUser, (req, res) => {
  const { id } = req.params;
  const { oldRole, newRole } = req.body;

  JobsModel.findOneAndUpdate(
    { _id: id, roles: oldRole },
    { $set: { "roles.$": newRole } },
    { new: true }
  )
  .then((updatedJob) => {
    if (updatedJob) {
      res.json({ success: true, message: "Role updated successfully", job: updatedJob });
    } else {
      res.status(404).json({ success: false, message: "Job category or role not found" });
    }
  })
  .catch((err) => res.status(500).json({ success: false, message: err.message }));
});


app.listen(5000, () => {
  console.log("Server is running");
});
