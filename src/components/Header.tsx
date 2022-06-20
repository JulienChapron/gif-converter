import React, { AppBar, Toolbar, Typography } from "@mui/material";
function Header() {
  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit" component="div">
          gif-converter
        </Typography>
        <Typography variant="h6">{process.env.REACT_APP_VERSION}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
