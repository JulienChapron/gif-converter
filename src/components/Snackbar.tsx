import React, { Snackbar, Alert } from "@mui/material";
function Header(props) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.openSnackbar.open}
      autoHideDuration={8000}
      onClose={() =>
        props.setOpenSnackbar({
          open: false,
          severity: "success",
          message: "no message",
        })
      }
    >
      <Alert severity={props.openSnackbar.severity} sx={{ width: "100%" }}>
        {props.openSnackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default Header;
