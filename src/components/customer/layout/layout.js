import React, { useState } from 'react';
import Aside from '../layout/sidebar';
import Main from "../dashboard/main";
import Report from "../dashboard/report/report";
import Package from "../dashboard/package/package"
import Illuminating_tree from "../dashboard/illuminating_level_tree/illuminating_tree"
import Rapid_tree from "../dashboard/rapidfire_level_tree/rapid_tree"

import Report_Activation from "../dashboard/report_activation/report_activation"
import Report_Withdrawal from "../dashboard/report_withdrawal/report_withdrawal"



import { Router,Routes, Route, useMatch } from "react-router-dom";


import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet,getCoin98Wallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import My_team from '../dashboard/my_team/my_team';

 require('@solana/wallet-adapter-react-ui/styles.css');
 const opts = {
  preflightCommitment: "processed"
}
const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet(),
  getMathWallet(),
   getSolletWallet(),
   getSolflareWallet(),
   getCoin98Wallet(),
] 


function Layout() {
  const wallet = useWallet();

  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const [name,setName] = useState('Report');

 
  
  

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };




  
  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''} themeColor`}>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />


      
  
    
      <Routes>


      <Route exact path="/" element={<Main
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="report"
    />} />

    <Route  path="/report_activation/:id" element={<Report_Activation
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="report"
    />} />

<Route  path="/report_withdrawal/:id" element={<Report_Withdrawal
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="report"
    />} />



<Route  path="/report/:id" element={<Report
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="report"
    />} />




      



<Route  path="/my_team" element={<My_team
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="report"
    />} />

<Route  path="/package/:id/:user_id" element={<Package
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="package"
    />} />

<Route  path="/illuminating_tree/:id/:user_id" element={<Illuminating_tree
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="illuminating_tree"
    />} />


<Route  path="/rapid_tree/:id/:user_id" element={<Rapid_tree
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name="illuminating_tree"
    />} />

    



  

<Route exact path="/example" element={<Report
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
        name={name}
    />} />

<Route  path="*" element={Report} />


</Routes>

   



    

    
      
    </div>
  );
}



export default Layout;

