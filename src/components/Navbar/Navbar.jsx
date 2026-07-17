import React from "react";
import chefIcon from "../../assets/chef-claude-icon.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-title">
      <img src={chefIcon} alt="" />
      <h1>Chef Claude</h1>
    </nav>
  );
};

export default Navbar;
