import React from "react";
import "./SideNav.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function SideNav() {
  return (
    <div className="sidenav">
      <div className="side_logo">
        <InstagramIcon className="logo" />
      </div>
      <div className="sidebar_buttons">
        <Button
          variant="outlined"
          className="side_btn"
          startIcon={<HomeIcon sx={{
            width: 30,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems : 'center'
          }}/>}
          sx={{
            width: 200,
            height: 50,
            mb: 0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems : 'center',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon sx={{
            width: 30,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems : 'center'
          }}/>}
          sx={{
            width: 200,
            height: 50,
            mb: 0.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems : 'center',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <Link to="/createPost" className="link">Create Post</Link>
        </Button>
      </div>
    </div>
  );
}

export default SideNav;
