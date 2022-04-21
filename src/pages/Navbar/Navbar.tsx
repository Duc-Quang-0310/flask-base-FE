import React from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const userId = localStorage.getItem("userId");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/authentication");
  };

  const handleRSA = () => {
    navigate("/text-rsa");
  };

  const handlePicture = () => {
    navigate("/home");
  };

  const render = () => {
    if (pathname === "/text-rsa") {
      return <MenuItem onClick={handlePicture}>Watermark with image</MenuItem>;
    }
    return <MenuItem onClick={handleRSA}>Text Encode</MenuItem>;
  };

  const handleLogOut = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="regular" sx={{ width: "100%" }}>
          <Typography variant="h6" color="inherit" component="div">
            Encryption Your World
          </Typography>
          <IconButton
            color="inherit"
            aria-label="account"
            sx={{ ml: "auto" }}
            onClick={handleClick}
          >
            <AccountCircle fontSize="large" />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {userId === null ? (
                <div>
                  <MenuItem onClick={handleLogin}>Login</MenuItem>
                  {render()}
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                </div>
              )}
            </Menu>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Navbar;
