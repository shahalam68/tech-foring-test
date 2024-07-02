import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import StudentModel from "./models/Student.js";
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
  StudentModel.create({ name, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  StudentModel.findOne({ email })
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
          res.cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: "strict" });
          res.cookie("refreshToken", refreshToken, { maxAge: 3000000, httpOnly: true, secure: true, sameSite: "strict" });
          return res.json({ Login: true });
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
        res.cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: "strict" });
        exist = true;
      }
    });
  }
  return exist;
};

app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ valid: true, message: "Authorized" });
});

app.post("/create/job", verifyUser, (req, res) => {
  const { category, role } = req.body;
  JobsModel.create({ category, role })
    .then((job) => res.json({ success: true, job }))
    .catch((err) => res.status(500).json({ success: false, message: err.message }));
});
app.get("/jobs", verifyUser, (req, res) => {
  JobsModel.find()
    .then((jobs) => res.json(jobs))
    .catch((err) => res.status(500).json({ success: false, message: err.message }));
});

app.listen(5000, () => {
  console.log("Server is running");
});
