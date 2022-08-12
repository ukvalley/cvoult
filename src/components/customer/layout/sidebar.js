import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader, 
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import logo from '../../../assets1/cvlogo.svg';

import { FaTachometerAlt, FaGem,  FaRegLaughWink } from 'react-icons/fa';

import {   Link,useNavigate } from "react-router-dom";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();

  function logout()
  {
    localStorage.removeItem("loggedInUser");
    navigate('/login');
  }
  
  return (
    <div id="header1">

    <ProSidebar
      
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <img className="sidebar_logo" src={logo}></img>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
          >
            Dashboard
            <Link to="/dashboard" />
          </MenuItem>
         
         
        </Menu>
        <Menu iconShape="circle">
          <SubMenu
            title='Report'
            icon={<FaRegLaughWink />}
          >
            <MenuItem>Referral Withdrawal Report <Link to="/dashboard/report_withdrawal/withdrawal" /> </MenuItem>
            <MenuItem>staking withdrawal Report <Link to="/dashboard/report_withdrawal/staking_withdrawal" /> </MenuItem>
            <MenuItem>Referral Report <Link to="/dashboard/report/referral" /> </MenuItem>
            <MenuItem>Downline Report <Link to="/dashboard/my_team" /> </MenuItem>

          </SubMenu>
          
          
          <MenuItem icon={<FaGem />} onClick={logout}> Logout</MenuItem>
        </Menu>

        
      </SidebarContent>

      
    </ProSidebar>
    
</div>
  );
};

export default Aside;