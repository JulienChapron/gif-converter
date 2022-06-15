import { AppBar, Toolbar, Typography } from "@mui/material";
function Header() {
  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" component="div">
          gif-converter
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
