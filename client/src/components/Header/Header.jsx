import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import AccountModal from "../Modals/AccountModal";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#182A59",
          padding: "25px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
          <img src={logo} alt="" width="40" />
          <Box>
            <Typography
              sx={{ color: "#fff", fontSize: "1.25rem", fontWeight: "700" }}
            >
              TechForing
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "11px", fontWeight: "400" }}
            >
              Shaping Tomorrows Cybersecurity
            </Typography>
          </Box>
        </Box>
        <Box>
          <Button onClick={handleOpen}>
            <AccountCircleIcon sx={{ width: "40px", height: "40px" }} />
          </Button>
        </Box>
      </Box>
      <AccountModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
