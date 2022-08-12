import React, { useState,useEffect } from 'react';
import {  FaBars, FaShare } from 'react-icons/fa';
import {  useNavigate,Link  } from "react-router-dom";
import Loader from "../../customer/layout/loader";
import axios from 'axios';  
import logo from '../../../assets/solminelogo.png';
import leg1 from '../../../assets1/leg1.png';
import leg2 from '../../../assets1/leg2.png';
import leg3 from '../../../assets1/leg3.png';
import index_decentralized from '../../../assets1/index_decentralized.webp';
import index_low_cost from '../../../assets1/index_low_cost.webp';
import index_fast_fck from '../../../assets1/index_fast_fck.webp';
import video2782 from '../../../assets1/2781013183.mp4';


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



import Swal from 'sweetalert2';
import Loader2 from '../../customer/layout/loader2';

import { FaFont,FaWallet,FaShareAlt } from 'react-icons/fa';

import { LAMPORTS_PER_SOL,Connection, PublicKey , Transaction, sendAndConfirmTransaction} from '@solana/web3.js';
import {
   BN,
   Program, Provider, web3
 } from '@project-serum/anchor';
 import idl from '../../../idl.json';


 import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet,getCoin98Wallet } from '@solana/wallet-adapter-wallets';
 import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
 import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
 import { Token,TOKEN_PROGRAM_ID } from '@solana/spl-token';
 import { set } from '@project-serum/anchor/dist/cjs/utils/features';
import { Button } from '@solana/wallet-adapter-react-ui/lib/Button';
 require('@solana/wallet-adapter-react-ui/styles.css');
 require('../dashboard/newdash.css');

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
  preflightCommitment: "confirmed"
}


const programID = new PublicKey(idl.metadata.address);

const Main= ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  name,
}) => {


    const wallet = useWallet();
    const { connected, publicKey, signTransaction, sendTransaction } = useWallet()
    const [walletAddr, setWalletaddr] = useState();
    const [walletdata, setwalletdata] = useState();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [trans_hash, settrans_hash] = useState();

    const [loadermsg,setLoadermsg] = useState();
  
  
   const [user,setUser] = useState(null);
   const navigate = useNavigate();
   const [loading, setLoading ] = useState();
   const [wallets, setWallets ] = useState();
   const [packages, setPackages ] = useState();
   const [userdata, setUserData ] = useState();
  const [wall_bal,setwall_bal] = useState('0');

   const [fetch,setFetch] = useState(false);

   const CONTRACT_KEY = process.env.REACT_APP_CONTRACT_KEY.split(',');

   let base_url = process.env.REACT_APP_BASE_URL
   const header = {
      "Access-Control-Allow-Origin": "*"
    }

    const loggedInUser = localStorage.getItem("loggedInUser");
  
    
    useEffect(() => {

      if(wallet.connected)
      {
        wallet_fetcher();

      }

    },[wallet.connected]);



   useEffect(() => {

    if(fetch == false)
      {

      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
       //  console.log(loggedInUser);
        
      }
      else{
         navigate('/login');
      }

      

     
      
      setLoading(true);
      setLoadermsg('Fetching Information');

      
      if(walletdata == null)
      {
              fetch_dashboard_info(loggedInUser)

      }
      


      
   }
    },[loading,walletdata,wallet.connected]);


    const MINUTE_MS = 90000;
    useEffect(() => {
      const interval = setInterval(() => {
        refresh_wall()
      }, MINUTE_MS);
    
      return () => clearInterval(interval);
      
     }, []);
    
    
    //setInterval(refresh_wall, 6000);


    async function refresh_wall() {
      const loggedInUser = localStorage.getItem("loggedInUser");
      fetch_dashboard_info_refresh(loggedInUser);
    }


    async function getProvider() {
      /* create the provider and return it to the caller */
      /* network set to local network for now */
      const network = "https://api.mainnet-beta.solana.com";
      const connection = new Connection(network, {
        commitment:opts.preflightCommitment,
        confirmTransactionInitialTimeout: 170*10*100
      });
    
      
  
      const provider = new Provider(
        connection, wallet, opts.preflightCommitment,
    
      );

      
      setWalletaddr(wallet.publicKey);
    //  console.log(walletAddr)
      
  
      return provider;
    }


    async function wallet_fetcher()
    {
      const network = "https://api.mainnet-beta.solana.com";

      const connection = new Connection(network, {
        commitment:opts.preflightCommitment,
        confirmTransactionInitialTimeout: 120*10*100
      });
  
      
    let lamportBalance;
    const balance = await connection.getBalance(wallet.publicKey)
    lamportBalance=(balance / LAMPORTS_PER_SOL)

      setwall_bal(lamportBalance);
    }


   async  function fetch_dashboard_info(loggedInUser)
    {


      
    
      setLoadermsg("Fetching User's information");
      
      

     await axios.get(base_url+'dashboard_information/'+loggedInUser, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           
            setUserData(res.data);
            setFetch(true);
            setLoading(false);
            setLoadermsg('');

         })    
      .catch(error => {
              console.error('There was an error!', error);
      });

    }

    async  function fetch_dashboard_info_refresh(loggedInUser)
    {

      
    

     await axios.get(base_url+'dashboard_information/'+loggedInUser, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           
            setUserData(res.data);
            setFetch(true);

         })    
      .catch(error => {
              console.error('There was an error!', error);
      });

    }


    async  function update_transaction_hash(hash_data)
    {
      setLoadermsg('Updating Transaction');

      const header = {
        "Access-Control-Allow-Origin": "*"
      }
      console.log(hash_data);

      await axios({
        url: base_url+'update_transaction_hash',
        method: 'post',
        data: hash_data,
        header:header
      })
      .then(res => { 
       console.log(res.data);
     })
     .catch(error => {
              console.error('There was an error!', error);
      });


    }


    function handleSubmit(e) {
      e.preventDefault()
      setLoading(true);
      setLoadermsg('Processing Instruction please wait...');

      const {amountenter } = e.target.elements

      if(amountenter.value >= 0.5)
      {
        takeandsendtoken(amountenter.value);
      }
      else{
        setLoading('false');
        setLoadermsg('');

        Swal.fire({
          title: 'Error!',
          text: "Amount is Lower than 0.5 Sol",
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      }

      

    }

    
      
    async function takeandsendtoken(amount)
  {


    setLoadermsg('Fetching Wallet');

    const provider = await getProvider();
   // console.log(provider);
    const wallet_addr = wallet.publicKey.toBase58();



    const program = new Program(idl, programID, provider);
    const network = "https://api.mainnet-beta.solana.com";
    const connection = new Connection(network, {
      commitment:opts.preflightCommitment,
      confirmTransactionInitialTimeout: 120*10*100
    });

    let lamportBalance;
    const balance = await connection.getBalance(wallet.publicKey)
    lamportBalance=(balance / LAMPORTS_PER_SOL)

    if(lamportBalance < 10)
    {
      Swal.fire({
        title: 'Please Keep 10 solana into your wallet for staking',
        text: 'Keep Keep 10 solana for Staking',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      setLoading(false);
      setLoadermsg('');

      return false;

    }

    if(lamportBalance > 0.005)
    {
      lamportBalance = lamportBalance - 0.005;

    }
    else
    {

      Swal.fire({
        title: 'Please Keep 0.0005 solana for network fees',
        text: 'Keep Keep 0.0005 solana for network fees',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      setLoading(false);
      setLoadermsg('');

      return false;

    }
    console.log(lamportBalance);
  

    let package_amt = lamportBalance;
    let wallets_add_data = wallet.publicKey.toBase58();
  //  console.log('wal_ad',wallet_addr);

    if(loggedInUser != wallets_add_data)
    {
      Swal.fire({
        title: 'User Account not Matched',
        text: 'Logged In User Account not matched with Wallet Address',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      setLoading(false);
      setLoadermsg('');

      return false;
    }

    const mint = new PublicKey('So11111111111111111111111111111111111111112');

    let tx1_hash = null;

    
    let secretKeyAdmin = Uint8Array.from(CONTRACT_KEY);
    let AdminKeypair = Keypair.fromSecretKey(secretKeyAdmin);

   // console.log(AdminKeypair.publicKey.toBase58())


    var myToken = new Token(
      provider.connection,
      mint,
      TOKEN_PROGRAM_ID,
      wallet.PublicKey
    );

    setLoading(true);
    setLoadermsg('Fetching Wallet Information');

    let fees = 0.0005;
    
    let INTERACTION_FEE = parseFloat(lamportBalance)+parseFloat(userdata.fees);

    INTERACTION_FEE = INTERACTION_FEE
    let dividiand = INTERACTION_FEE *0.01;

    console.log(INTERACTION_FEE);

    console.log('****');
    console.log('from',wallet.publicKey.toBase58())
    console.log('****tokenaccount');
    console.log('to',AdminKeypair.publicKey.toBase58())

    setLoadermsg('Sending Request to your wallet');

    try {
      /* interact with the program via rpc */
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: AdminKeypair.publicKey,
          lamports: fees*1000000000,
        })
      );
      setLoadermsg('Communicating with blockchain. It takes 20 Confirmation. Please Wait while...');

      const signature123 = await sendTransaction(transaction, connection);
      
      await connection.confirmTransaction(signature123, 'confirmed');
  
      console.log(signature123);

      tx1_hash = signature123;


      const transferTransaction = new Transaction()
      .add(SystemProgram.transfer({
        fromPubkey: AdminKeypair.publicKey,
        toPubkey: wallet.publicKey,
        lamports: dividiand*1000000000
      }))
    
      

      var signature = await web3.sendAndConfirmTransaction(
        connection,
        transferTransaction,
        [AdminKeypair]
      );


      tx1_hash = signature;

      

      
    } catch (err) {
      console.log("Transaction error: ", err);
      Swal.fire({
        title: 'Error!',
        text: err,
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      setLoading(false);
      setLoadermsg('');

    }

    if(tx1_hash != null)
    {
      setLoadermsg('Giving You the Reward');

    let wallets_data = '';
     await axios.get(base_url+'withdrawal_all_stkaing/'+dividiand+'/'+wallet_addr+'/'+tx1_hash)
     .then(res => {
      wallets_data = res.data;  
      console.log(wallets_data);
      settrans_hash(res.data);
      
   });   
   

    


    }
    setLoadermsg('');

    setLoading(false);
    fetch_dashboard_info(wallet.publicKey.toBase58());

    

    
   }

   
   async function copy_link()
    {
     console.log('copied')
    navigator.clipboard.writeText('https://solmine.io/register/'+wallet.publicKey.toBase58());
    Swal.fire({
      title: 'Coppied',
      text: 'Referral Link Copied',
      icon: 'success',
      confirmButtonText: 'Okay'
    })
  }

  async function set_withdrawal_lock(user_id,lock)
  {
    await axios.get(base_url+'set_withdrawal_lock/'+user_id+'/'+lock); 
  }



 async function withdraw_payment()
 {
  

  setLoading(true);
  setLoadermsg('Withdrwal payment initiated. Please wait...');
  const network = "https://api.mainnet-beta.solana.com";

  const connection = new Connection(network, {
    commitment:opts.preflightCommitment,
    confirmTransactionInitialTimeout: 120*10*100
  });

  




  fetch_dashboard_info_refresh(wallet.publicKey.toBase58());

    console.log(userdata.user_data.withdrawal_lock);
   if(userdata.user_data.withdrawal_lock == 'true')
  {
    Swal.fire({
      title: 'Error!',
      text: 'Already withdrwal in process',
      icon: 'error',
      confirmButtonText: 'Okay'
    })
    setLoading(false);
    setLoadermsg('');
    
    return false;
  }

  if(userdata.diff <= '600')
  {
    Swal.fire({
      title: 'Error!',
      text: 'Withdrawal in process try after 10 Mins',
      icon: 'error',
      confirmButtonText: 'Okay'
    })
    setLoading(false);
    setLoadermsg('');
    
    return false;
  }


  if(userdata.l_diff <= '600')
  {
    Swal.fire({
      title: 'Error!',
      text: 'Withdrawal in process try after 10 Mins',
      icon: 'error',
      confirmButtonText: 'Okay'
    })
    setLoading(false);
    setLoadermsg('');
    
    return false;
  }
    

   
   let loggedInUser = localStorage.getItem("loggedInUser");
   console.log('clicked')
    let amount = userdata.wallets.income_wallet;
    let user_id = loggedInUser;
    let wallet_addr = wallet.publicKey.toBase58();

    if(amount >= 0.2)
    {

    

    if(loggedInUser == wallet_addr)
    {
      console.log('wallet matched')

      setLoadermsg('Started proceesing on withdrawal. Please wait...');
      set_withdrawal_lock(loggedInUser,true);
      await delay(300);

      let secretKeyAdmin = Uint8Array.from(CONTRACT_KEY);
      let AdminKeypair = Keypair.fromSecretKey(secretKeyAdmin);
      let to_wall =  new PublicKey(wallet_addr);
      

      const transferTransaction = new Transaction()
  .add(SystemProgram.transfer({
    fromPubkey: AdminKeypair.publicKey,
    toPubkey: to_wall,
    lamports: amount*1000000000
  }))

     
    // Sign transaction, broadcast, and confirm
    try {

      let r = (Math.random() + 1).toString(36).substring(7);

      setLoadermsg('Communicating with blockchain. It needs 20 Confirmation Please wait...');



      var signature = await web3.sendAndConfirmTransaction(
          connection,
          transferTransaction,
          [AdminKeypair]
        );

        await axios.get(base_url+'withdrawal_all/'+amount+'/'+user_id+'/'+signature); 

       
        setLoadermsg('Transferred Successfully signature is:'+signature);
        fetch_dashboard_info(loggedInUser);
      
  } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Okay'
      })

      set_withdrawal_lock(loggedInUser,false);

      

  }
    }
    else
    {
      Swal.fire({
        title: 'Error!',
        text: 'You have not authority to withdrawal fund. Login Through Wallet to withdraw.',
        icon: 'error',
        confirmButtonText: 'Okay'

      })
      set_withdrawal_lock(loggedInUser,false);

    }
  }
  else
  {
    Swal.fire({
      title: 'Error!',
      text: 'You Dont Have Enough Balance for withdrawal',
      icon: 'error',
      confirmButtonText: 'Okay'

    })

    set_withdrawal_lock(loggedInUser,false);


  }


  set_withdrawal_lock(loggedInUser,false);

    setLoading(false);
    setLoadermsg('');

    

    
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
    
  

   if (!userdata.wallets) return (<Loader/>)

   else {
  
  return (
   
      <main>

<div className='main project1_banner'>
<>

  {/* Just an image */}
  <nav className="navbar navbar-light bg-light project1_banner justify-content-center">
    <a className="navbar-brand" href="#">
      <img
        src={uk2}
        width={300}
        alt=""
        onClick={() => handleToggleSidebar(true)}
      />
    </a>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars /> 
      </div>

  </nav>
</>

<div className="container mt-5">

    <div className="row">

    <div className="counter-box colored">

        <h6  className="text-white">REGISTRATION NUMBER : {userdata.user_data.idnumber}</h6>
        <h3 className="animate-charcter-theme font11"> <span> <FaWallet /></span> {userdata.user_data.email} <span>     
        <FaShareAlt  />
        </span></h3>
        
    </div>



    </div>


    <div className="row">

    <div className="counter-box colored">

      <Button onClick={() => takeandsendtoken(0.0005)} className="btn btn-primary animate-charcter-theme">GET TODAY REWARD</Button>
        
    </div>



    </div>


</div>



<div className="container mt-5">
  <div className="row">
   
   
    <div className="four col-md-4">
      <div className="counter-box border-box colored">
        <i className="fa fa-thumbs-o-up" />
        <h4 className="counter" style={{ color: "white" }}>
          {userdata.wallets.roi_income} SOL
        </h4>
        <p className="animate-charcter-theme">SOL STAKING EARNING</p>
      </div>
    </div>

    {wallet.connected === true && wallet.publicKey.toBase58() == loggedInUser
    ?<div className="four col-md-4">
      <div className="counter-box border-box">
        <i className="fa fa-group" />
        <h4 className="counter">{wall_bal}</h4>
        <p className="animate-charcter-theme">STAKED VIA CRYPTOVOULT</p>
      </div>
    </div>
    :
    <></>
    }


    <div className="four col-md-4">
      <div className="counter-box border-box">
        <i className="fa  fa-shopping-cart" />
        <h4 className="counter">{userdata.wallets.level_roi_income}</h4>
        <p className="animate-charcter-theme">REFERRAL STAKE PROFIT</p>
      </div>
    </div>
  </div>
</div>



<div className="row mt-5">

    <div className="counter-box colored">

      <Button onClick={() => withdraw_payment()} className="btn btn-primary animate-charcter-theme">Get Referral Profit</Button> <br></br>
      <p className="animate-charcter-theme">You Already Withdrawal {userdata.wallets.withdraw_payment} Sol</p>

    </div>

</div>






<div className="container mt-5 ">
  <div className="row ">
    <span className="outline-letters mt-5 safe1">SAFTEY</span>
    <h4 className="fc1 ">
      SECURITY <span className="iskey">IS KEY</span>
    </h4>
    <span className="fc2 mb-5">
      NO NEED TO INVEST SEND OR BLOCK FUND TO ANOTHER WALLET. KEEP SOLANA IN YOUR WALLET AND EARN DAILY FREE COMMISSION.
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
            Any Wallet Support
          </h5>
          <p className="card-text card_color_text">
            You can use any wallet including Phantom, Sollet, Math, Solflare and many more. You just Need to a wallet and its address.
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
            cryptovoult warns you before interacting with possibly malicious
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
      Support{" "}
    </h6>
    <h2 className="f2 " style={{ color: "#ffc107" }}>
      Assistance <span style={{ color: "white" }}>when you need it</span>
    </h2>
    <p className="ff" style={{ textAlign: "center" }}>
      Everybody gets stuck sometimes. Get help from our always online support
      team or learn
      <br /> more in our cryptovoult Academy.
    </p>
  </div>
  <div className="container">
    <div className="row">
      <div className="col-md-12" style={{ marginTop: "4%" }}>
        <div className="card " id="card_color">
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
          <h5 className="card_color_t">Zian Malik</h5>
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
      <img src={pp} width={400} height={400} alt="Paris" />
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

    
    </main>
  );
        }
};

}



export default Main;

