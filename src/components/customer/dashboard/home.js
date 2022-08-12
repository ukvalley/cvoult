import React, { useState } from 'react';
import {  useNavigate,Link  } from "react-router-dom";

import logo from '../../../assets/solminelogo.png';

import index_decentralized from '../../../assets1/index_decentralized.webp';
import index_low_cost from '../../../assets1/index_low_cost.webp';
import index_fast_fck from '../../../assets1/index_fast_fck.webp';
import video2782 from '../../../assets1/2781013183.mp4';



import Loader2 from '../../customer/layout/loader2';


import aa from "../../../assets1/aa.png"
import tra1 from "../../../assets1/tra1.png"
import tra2 from "../../../assets1/tra2.png"
import tra3 from "../../../assets1/tra3.png"

import abc from "../../../assets1/abc.png"
import aca from "../../../assets1/aca.png"

import uu from "../../../assets1/uu.png"
import pp from "../../../assets1/pp.png"

import gg from "../../../assets1/gg.png"
import app from "../../../assets1/app.png"

import uk2 from"../../../assets1/cvlogo.svg"


import { Connection, PublicKey  } from '@solana/web3.js';
import {
   BN,
   Program, Provider, web3
 } from '@project-serum/anchor';
 import idl from '../../../idl.json';


 import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet,getCoin98Wallet } from '@solana/wallet-adapter-wallets';
 import { useWallet } from '@solana/wallet-adapter-react';



 require('@solana/wallet-adapter-react-ui/styles.css');
 require('../dashboard/front.css');


 const wallets = [
   /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
   getPhantomWallet(),
   getMathWallet(),
    getSolletWallet(),
    getSolflareWallet(),
    getCoin98Wallet(),
 ] 
 const { SystemProgram, Keypair } = web3;
/* create an account  */
//const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}


const programID = new PublicKey(idl.metadata.address);
require('../dashboard/front.css');
const Home= ({
  
}) => {

    const [walletAddr, setWalletaddr] = useState();
    const [walletdata, setwalletdata] = useState();
    const wallet = useWallet();
    const { connected, publicKey, signTransaction, sendTransaction } = useWallet()
   

    const [loadermsg,setLoadermsg] = useState();
  
  
   
   const navigate = useNavigate();
   const [loading, setLoading ] = useState(false);
   



   

   let base_url = process.env.REACT_APP_BASE_URL

  



  
    

    


    async function getProvider() {
      /* create the provider and return it to the caller */
      /* network set to local network for now */
      const network = "https://api.mainnet-beta.solana.com";
      const connection = new Connection(network, opts.preflightCommitment);
      
  
      const provider = new Provider(
        connection, wallet, opts.preflightCommitment,
    
      );

      
      setWalletaddr(wallet.publicKey);
    //  console.log(walletAddr)
      
  
      return provider;
    }


  

    
   


   

    
      
   


 




   if(loading == true || loading == null )
   
   {
      return(
        <main className='fullh'>
         <Loader2
         msg={loadermsg}
         /> 
         </main>
         )
      
      
   }

   

  else
  {
    
  

   
  
  return (
<div className='main project1_banner'>
<>
  {/* Just an image */}
  <nav className="navbar navbar-light bg-light project1_banner justify-content-center">
    <a className="navbar-brand" href="#">
      <img
        src={uk2}
        width={300}
        alt=""
      />
    </a>
  </nav>
</>

 <div className="container mb-5">
  <div className="row ">
    <div className="col-md-6 ">
      <h1 className="project1_banner_home_tag" style={{ color: "white" }}>
        World's #1 Crypto Voult in-wallet staking
      </h1>
      <h2 className="project1_banner_home_tag_s">Solana Voult</h2>
      <Link to="/login"> <button className='btn btn-primary'>Log In</button></Link>
      <p className="project1_banner_home_tag_p">
        Cryptovoult is the safest way to start exploring Solana. Buy, store, swap
        tokens &amp; NFTs and access Solana DeFi from web or mobile.
      </p>
    </div>
    <div className="col-md-6 mr-5">
      <img className="project1_banner_home" src={aa} />
    </div>
  </div>
</div>

<div className="container mt-5">
  <div className="row">
    <div className="four col-md-4">
      <div className="counter-box colored">
        <i className="fa fa-thumbs-o-up" />
        <h4 className="counter" style={{ color: "white" }}>
          2540028 SOL
        </h4>
        <p>CIRCULATING SOL STAKED</p>
      </div>
    </div>
    <div className="four col-md-4">
      <div className="counter-box">
        <i className="fa fa-group" />
        <h4 className="counter">$3,064,820,720.00</h4>
        <p>STAKED VIA CRYPTOVOULT</p>
      </div>
    </div>
    <div className="four col-md-4">
      <div className="counter-box">
        <i className="fa  fa-shopping-cart" />
        <h4 className="counter">◎ 91.19MM</h4>
        <p>IN STAKE ACCOUNTS</p>
      </div>
    </div>
  </div>
</div>
<div className="container mt-5 ">
  <div className="row ">
    <span className="outline-letters mt-5 safe1">SAFE</span>
    <h2 className="fc1 ">
      Security <span className="iskey">is Key</span>
    </h2>
    <span className="fc2 mb-5">
      Cryptovoult was the first Solana wallet ever. Our core mission to keep users
      as safe as possible will never change.
    </span>
    <div className="col-md-4 mt-5">
      <div
        className="card lp__feature-card"
        id="card_color"
        style={{ width: "20rem" }}
      >
        <img src={tra1} className="card-img-top card1" />
        <div className="card-body ">
          <h5 className=" card_color_t">Transaction Simulations</h5>
          <p className="card-text card_color_t">
            See exactly what leaves your wallet before signing a Transaction and
            be protected at all times.
          </p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mt-5 ">
      <div
        className="lp__feature-card card mt-5"
        id="card_color"
        style={{ width: "20rem" }}
      >
        <img src={tra2} className="card-img-top card1" alt="..." />
        <div className="card-body ">
          <h5 className="card_color_text card_color_t">
            Hardware Wallet Support
          </h5>
          <p className="card-text card_color_text">
            The safest way to interact with Blockchains is with a hardware
            wallet. Solflare supports Ledger on both web and mobile.
          </p>
        </div>
      </div>
    </div>
    <div className="col-md-4 mt-5">
      <div
        className="lp__feature-card card mt-5"
        id="card_color"
        style={{ width: "20rem" }}
      >
        <img src={tra3} className="card-img-top card3" alt="..." />
        <div className="card-body ">
          <h5 className="card_color_t">Anti-Phishing</h5>
          <p className="card-text card_color_text">
            Cryptovoult warns you before interacting with possibly malicious
            websites. Explore Solana dApps with ease of mind.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<>
  <div className="container-fluid mt-5 mb-5">
    <h6 className="outline-letters " id="f1">
      {" "}
      SUPPORT{" "}
    </h6>
    <h2 className="f2 " style={{ color: "#ffc107" }}>
      Assistance <span style={{ color: "white" }}>when you need it</span>
    </h2>
    <p className="ff" style={{ textAlign: "center" }}>
      Everybody gets stuck sometimes. Get help from our always online support
      team or learn
      <br /> more in our Cryptovoult Academy.
    </p>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-md-6" style={{ marginTop: "4%" }}>
        <div className="card " id="card_color" style={{ width: "20rem" }}>
          <img
            className="card-img-top"
            id="sizee"
            style={{}}
            src={abc}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title card_color_text1">Cryptovoult Live Chat</h5>
            <p className="card-text card_color_text">
              Our team of trained professionals is available 24/7 to assist you
              whenever you need help. Just launch live-chat and tell us what you
              need.
            </p>
            <a href="#" className="btn btn-warning get_help">
              GET HELP
            </a>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</>
<div className="container" style={{ color: "black" }}>
  <div className="row" style={{ marginTop: "14%" }}>
    <div className="col-md-4 mt-5">
      <h1 className="b">Here's what others have to say about </h1>
      <h2 id="b1">Cryptovoult</h2>
    </div>
    <div className="col-md-4 ">
      <div className="card" id="card_color" style={{ marginTop: "4%" }}>
        <img
          className="card-img-top"
          id="card_img"
          src={uu}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title card_color_t">Rechards P</h5>
          <p className="card-text card_color_text">
          Find the new way of earnign passive income source through it.
          </p>
          <p className="card-text card_color_text">23 JULY 2022</p>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card" id="card_color" style={{ marginTop: "4%" }}>
        <img className="card-img-top" id="card_img" src={uu} />
        <div className="card-body">
          <h5 className="card_color_t">Zian Malik
</h5>
          <p className=" card_color_t">
          I can not explain how I earnign profit. Its really amazing and superb.
          </p>
          <p className="card-text card_color_text">04 AUG 2022</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="container">
  <div className="container-fluid mt-5 mb-5">
    <h6 className="outline-letters mt-5" id="slr">
      {" "}
      SLRS{" "}
    </h6>
    <h2 className="eco" style={{ color: "white" }}>
      Our<span style={{ color: "#ffc107" }}>Ecosystem</span>
    </h2>
    <p className="ff" style={{ textAlign: "center" }}>
      SLRS is the token that fuels the entire Solrise ecosystem, providing{" "}
      <br />
      utility and benefits across all our products.
    </p>
  </div>
  <center>
    <div className="col-md-6 rotate">
      <img src={pp} width={200} height={200} alt="Paris" />
    </div>
  </center>
</div>
<section>
  <div className="container" style={{ marginTop: "14%" }}>
    <div className="card red py-2 mt-5" id="ab">
      <div className="card-body text-white ">
        <div className="col-md-6">
          <h2 className="abc">Try Cryptovoult now!</h2>
          <p className="card-text abcc1">
            Lightning fast transactions on Solana, right in your pocket.
             Safe and secure, right where you are.
          </p>
          <div className="col-md-6">
            <a href="">
              <img src={app} />
            </a>
          </div>
          <div className="col-md-6 mt-5">
            <a href="">
              <img src={gg} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<footer className="page-footer font-small blue mt-5 text-center">
  <div className="container ">
    <img src={uk2} width={300} alt="" />
    <h3 className="f_color"></h3>
  </div>
  {/* Copyright */}
  <div className="footer-copyright text-center py-3 card_color_t">
    © 2022 Copyright:
    <a className="f_color" href="#">
      {" "}
      cryptovoult.com
    </a>
  </div>
  {/* Copyright */}
</footer>

</div>
  );
        }
};





export default Home;

