import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import styles from "../navbar/Navbar.module.css";
import Setting from "../../assets/settings.svg";
import Analytics from "../../assets/database.svg";
import Board from "../../assets/layout.svg";
import Logo from "../../assets/Group 1.svg";
import Logout from "../../assets/Logout.svg";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <button
        className={styles.toggleButton}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <Sidebar
        backgroundColor="white"
        className={`${styles.sidebarStyle} ${isSidebarOpen ? styles.open : styles.closed
          }`}
      >
        {/* Logo */}
        <div className={styles.sidebarheader}>
          <img style={{ width: "7rem" }} src={Logo} alt="logo" />
        </div>

        {/* Menu Items */}
        <div className={styles.menuContainer}>
          <Menu>
            <MenuItem
              className={styles.menuItemStyle}
              component={<Link to="/" />}
            >
              <img src={Board} className={styles.icons} alt="board-icon" />
              <span style={{ marginLeft: "45%" }}>Board</span>
            </MenuItem>
            <MenuItem
              className={styles.menuItemStyle}
              component={<Link to="/analytics" />}
            >
              <img
                src={Analytics}
                className={styles.icons}
                alt="analytics-icon"
              />
              <span style={{ marginLeft: "45%" }}>Analytics</span>
            </MenuItem>
            <MenuItem
              className={styles.menuItemStyle}
              component={<Link to="/settings" />}
            >
              <img src={Setting} className={styles.icons} alt="settings-icon" />
              <span style={{ marginLeft: "45%" }}>Settings</span>
            </MenuItem>
          </Menu>
        </div>

        {/* Footer with Logout */}
        <Menu className={styles.footer}>
          <MenuItem
            className={styles.logoutStyle}
            component={<Link to="/login" />}
          >
            <img src={Logout} className={styles.icons} alt="logout-icon" />
            <span style={{ marginLeft: "45%", color: "#CF3636" }}>Log Out</span>
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Navbar;
