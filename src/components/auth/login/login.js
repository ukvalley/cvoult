


import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';
import Loader from "../../customer/layout/loader";
import Swal from 'sweetalert2';
import logo from"../../../assets1/cvlogo.svg"

import  './login.css';




import { useState,useEffect } from 'react';
import { Connection} from '@solana/web3.js';
import { Provider} from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

  


  

/* create an account  */
const opts = {
  preflightCommitment: "processed"
}







 function Login() {


    const wallet = useWallet();
    const [walletAddr, setWalletaddr] = useState();
    
    const navigate = useNavigate();
    const [loading, setLoading ] = useState(null);
    const header = {"Access-Control-Allow-Origin": "*"}

    const [siteSetting, setSiteSetting] = useState(null);

    let base_url = process.env.REACT_APP_BASE_URL

   
      useEffect(() => {
        if(siteSetting == null)
        { 
             fetchSetting();
         }
    },[siteSetting]);


    

    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = "https://api.mainnet-beta.solana.com";
        const connection = new Connection(network, opts.preflightCommitment);
        
    
        const provider = new Provider(
          connection, wallet, opts.preflightCommitment,
      
        );
        setWalletaddr(wallet.publicKey.toBase58());
       // console.log(wallet.publicKey.toBase58());
    
        return provider;
      }
    
    

    // end of useeffects

    async function fetchSetting(){
        setLoading(true);
        axios.get(base_url+`show/1`)  
        .then(res => {  
          const animals = res.data;  
          setSiteSetting(res.data);
          setLoading(false);
         
        });

    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true);
       // console.log(e);
        const {idnumber } = e.target.elements
      //  console.log({idnumber: idnumber.value })

        axios.get(base_url+'fetch_user_data/'+idnumber.value, {headers:header})
        .then(res => {
            
            if(res.data.email != null)
            {
              //  console.log(res.data);
                localStorage.clear();
                localStorage.setItem('loggedInUser', res.data.email);                
                navigate('/dashboard');
              //  console.log(res.data); 
            }
            else{
              //  console.log('userid not present');
                Swal.fire({
                  title: 'Error!',
                  text: "Account Not Present",
                  icon: 'error',
                  confirmButtonText: 'Okay'
                })
            }
        })
        .catch(error => {
             //   console.error('There was an error!', error);
                Swal.fire({
                  title: 'Error!',
                  text: "Something Went Wrong",
                  icon: 'error',
                  confirmButtonText: 'Okay'
                })
        });

        setLoading(false);
      };

     async function login_user_with_wallet()
      {
        const provider =  await getProvider();


        

        setLoading(true);
            const wallet_addr = wallet.publicKey.toBase58();
            const url = base_url+"fetch_user_data_email/"+wallet_addr;
          //  console.log(url);
            axios.get(base_url+'fetch_user_data_email/'+wallet_addr, {headers:header})
        .then(res => {
            
            if(res.data.email != null)
            {
                if(res.data.email != null)
                {
             //   console.log(res.data);
                localStorage.clear();
                localStorage.setItem('loggedInUser', res.data.email);                
                navigate('/Dashboard');

                }
                else
                {
                   // console.log(res.data);
                    console.log('Account not present');
                    Swal.fire({
                      title: 'Error!',
                      text: "Account Not Present",
                      icon: 'error',
                      confirmButtonText: 'Okay'
                    })

                }
                
              //  console.log(res.data); 
            }
            else{
               // console.log('userid not present');
                Swal.fire({
                  title: 'Error!',
                  text: "Account Not Present",
                  icon: 'error',
                  confirmButtonText: 'Okay'
                })
            }
        })
        .catch(error => {
              //  console.error('There was an error!', error);
                Swal.fire({
                  title: 'Error!',
                  text: "Something Went Wrong",
                  icon: 'error',
                  confirmButtonText: 'Okay'
                })
        });

        
        setLoading(false);
      }


      

      

 if(loading == true)
 {
    return (
        <Loader/>
      )
 }
 else{

    

 
  return (
    <div className="container1 bg-gradient1 mb-5">
       
  <div className="home-table">
      <div className="container1">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            
            <div className="account_box bg-gradient1">
              <img
                src={logo}
                alt=""
                className="img-fluid mx-auto d-block"
                style={{ height: 62, marginBottom: 15 }}
              />
              <form className="myform" onSubmit={handleSubmit}>
                <div className="text-center text-white">Wallet Address : {walletAddr}</div>
                <div className="col-lg-12 mt-3">
                  <label className="text-white">Enter ID Number OR  Enter ID</label>
                  <input
                    type="text" 
                    id='idnumber'
                    
                    required={true}
                    className="form-control trial-input"
                    placeholder="Enter ID Number OR  Enter ID"
                  />
                </div>
                
                  
                <div className="col-lg-12">
                  <button className="btn btn-primary w-100 mt-3" type="submit">
                   Log In</button>
                </div>

                <center>
                <div className="col-lg-12">
                {!wallet.connected
                ?
                <div className="btn-lg full mt-5 w-100">
                <WalletMultiButton /></div>
                  :<button className="btn btn-primary w-100  btn-lg full mt-5" type="button" 
                  onClick={login_user_with_wallet} 
                  >Secure Login</button>
                }
                </div></center>

                <div>
                  <p className="mb-0 text-center mt-3">
                  <Link to="/register"> <p>Not Registered yet, Login here</p> </Link>
     
                  </p>
                </div>
              </form>
            </div>
           
          </div>
          
        
      </div>
    </div>
  </div>
 </div>
  );

  
}
      }



  
  export default Login;





