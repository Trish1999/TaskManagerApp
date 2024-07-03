import React from 'react'
import { Sidebar, Menu, MenuItem ,sidebarClasses,menuClasses } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

import styles from "../navbar/Navbar.module.css"
import Setting from "../../assets/settings.svg";
import Analytics from "../../assets/database.svg";
import Board from "../../assets/layout.svg";
import Logo from "../../assets/Group 1.svg";
import Logout from "../../assets/Logout.svg";


function Navbar() {


  return (
    <div>
      <Sidebar width="13vw"
  backgroundColor="white"
 className={styles.sidebarStyle}>
      <div className={styles.sidebarheader}>
          <img style={{width:"7rem"}} src={Logo} alt="logo"/>
        </div>
        <div className={styles.menuContainer}>
        <Menu  height="0.3rem">
          <MenuItem className={styles.menuItemStyle} component={<Link to="/" />}>
            <img src={Board} className={styles.icons} />
             <span style={{marginLeft:"45%"}}>Board</span>
          </MenuItem>
                   <MenuItem className={styles.menuItemStyle} component={<Link to="/analytics" />}>
            <img src={Analytics} className={styles.icons} />
            <span style={{marginLeft:"45%"}}>Analytics</span>
          </MenuItem>
                   <MenuItem className={styles.menuItemStyle} component={<Link to="/settings" />}>
            <img  src={Setting} className={styles.icons} />
            <span style={{marginLeft:"45%"}}>Settings</span>
          </MenuItem>
          </Menu>
          </div>
        
          <Menu className={styles.footer}>
            <MenuItem className={styles.logoutStyle} component={<Link to="/login" />}>
              <img src={Logout} className={styles.icons} />
              <span style={{ marginLeft: "45%", color: "#CF3636" }}>Log Out</span>
            </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}

export default Navbar
