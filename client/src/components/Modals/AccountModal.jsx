import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/base";

const style = {
  position: "absolute",
  top: "25%",
  left: "85%",
  transform: "translate(-50%, -50%)",
//   width: 400,
  bgcolor: "background.paper",
  //   border: '2px solid #000',
  boxShadow: 12,
  borderRadius: "8px",
  p: 4,
};

export default function AccountModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: { backgroundColor: "transparent" },
      }}
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Box>
            <AccountCircleIcon
              sx={{ width: "40px", height: "40px", mt: "10px" }}
            />
          </Box>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Soykot Alam
            </Typography>
            <Typography>a.k.mshahalam68@gmail.com</Typography>
          </Box>
        </Box>
        <Box sx={{textAlign:"center" ,mt:"20px"}}>
          <Button ><Typography sx={{backgroundColor:"#182A59",color:"#fff",paddingLeft:'10px',paddingRight:"10px",borderRadius:"3px"}}>Log Out</Typography></Button>
        </Box>
      </Box>
    </Modal>
  );
}
