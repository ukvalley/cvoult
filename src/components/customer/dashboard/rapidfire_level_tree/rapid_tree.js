import React, { useState,useEffect } from 'react';
import {  Link, useNavigate, useParams  } from "react-router-dom";
import axios from 'axios';  
import logo from '../../../../assets1/soullogo1.png';
import { FaHeart, FaBars } from 'react-icons/fa';

import Loader from "../../../customer/layout/loader";
import Table from 'react-bootstrap/Table'
import Swal from 'sweetalert2';

const Rapid_tree = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  name,
}) => {

    const header = {
        "Access-Control-Allow-Origin": "*"
      }

      const [fetch,setFetch] = useState(false);
    const [walletAddr, setWalletaddr] = useState();
    const [walletdata, setwalletdata] = useState();
  
  
   const [user,setUser] = useState(null);
   const navigate = useNavigate();
   const [loading, setLoading ] = useState();
   const [wallets, setWallets ] = useState();
   const [packages, setPackages ] = useState();
   const [userdata, setUserData ] = useState();
   const [package_data, setpackage_data ] = useState();

    const loggedInUser = localStorage.getItem("loggedInUser");

    const {id} =  useParams();
    const {user_id} =  useParams();

  
    
   


   useEffect(() => {

      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
       //  console.log(loggedInUser);
        
      }
      else{
         navigate('/login');
      }

      if(fetch == false)
      {

     
      
      setLoading(true);
      

      fetch_dashboard_info(loggedInUser)

      
   }
    },[loading,fetch]);


    async  function fetch_dashboard_info(loggedInUser)
    {

        setLoading(true);
        
     await axios.get('https://raisingfinanance.com/soulignite/api/fetch_dashboard_information/'+loggedInUser, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           
            setUserData(res.data);
            
            
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });




      await axios.get('https://raisingfinanance.com/soulignite/api/fetch_package_rapid_tree/'+user_id+'/'+id, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           
            setpackage_data(res.data);
            setFetch(true)
            setLoading(false);
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });

    }


    async function fetch_tree(user_id,package_amt)
    {
        setLoading(true);
        
        if(user_id == null || !user_id)
        {
            setLoading(false);
            Swal.fire({
                title: 'No Account Present!',
                text: 'No Account Present!',
                icon: 'error',
                confirmButtonText: 'Okay' })
        }
        else
        {

        
            
            await axios.get('https://raisingfinanance.com/soulignite/api/fetch_package_rapid_tree_self_id/'+user_id+'/'+package_amt, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           if(res.data != null)
           {
            setpackage_data(res.data);
           }
            
            setFetch(true)
            setLoading(false);
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });

        }
        

    }


    if(loading == true || loading == null )
   
    {
       return(
        <main className='fullh'>
        <Loader/>
     </main>
     )
       
       
    }

    else
    {

        if (!userdata.wallets && !package_data.wallets) 
        {
            return (<main className='fullh'>
            <Loader/>
         </main>)
        }

   else {

    
  
  return (
    <main className='fullh'>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)} >
        <FaBars />
      </div>

      <header>
        <div className='row mb10'>
          <img className='logo_dashboard' src={logo} alt='import'></img>
          <h4 className='text-gradient text-center-wall'>{userdata.user_data.email}</h4>
        </div>

        <div className='row mb10'>
          <h4 className='text-gradient text-center-wall'>Package : {id}</h4>
        </div>
      <div className="container bootstrap snippets bootdey">
   
    </div>

    </header>




     
   




      <div className='block'>
        <div className='row'>

       

        <div className="col-md-12 col-sm-12 col-xs-12">
      <div className="card1">
   

   <div className="card-badge label-purchased">Illuminating Matrix</div>
   <div className="card-heading-1 text-white">$ {id}</div>
   <div className="card-label">
   
      <div className="label-purchased"><i className="fa fa-check"></i> {package_data.rapid_data.self}</div>
   </div>
   <div className="tree-view">
      <div className="master-leaf"></div>
      <ul>
         <li className="leaf-1">
            <a onClick={() => fetch_tree(package_data.rapid_data.child1,id)} title={package_data.rapid_data.child1} >{package_data.rapid_data.child1 != null ? "**"+package_data.rapid_data.child1_data.user_id.slice(-4) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
            <ul>
                <li className="leaf-1">
                <a onClick={() => fetch_tree(package_data.rapid_data.child3,id)} title={package_data.rapid_data.child3} >{package_data.rapid_data.child3 != null ? "**"+package_data.rapid_data.child3_data.user_id.slice(-4) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
                </li>
                <li className="leaf-1">
                <a onClick={() => fetch_tree(package_data.rapid_data.child4,id)} title={package_data.rapid_data.child4} >{package_data.rapid_data.child4 != null ? "**"+package_data.rapid_data.child4_data.user_id.slice(-4) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
                </li>
                
            </ul>
         </li>
         <li className="leaf-1">
         
         
         
            <a
            onClick={() => fetch_tree(package_data.rapid_data.child2,id)}
            title={package_data.rapid_data.child2}  >
            {package_data.rapid_data.child2 != null ? 
             "**"+package_data.rapid_data.child2_data.user_id.slice(-4) : 'Blank' } 
            <br /> 
            <i className="icon-hexagon"></i></a>
            <ul>
            <li className="leaf-1">
                <a onClick={() => fetch_tree(package_data.rapid_data.child5,id)} title={package_data.rapid_data.child5} >{package_data.rapid_data.child5 != null ? "**"+package_data.rapid_data.child5_data.user_id.slice(-4) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
                </li>
                <li className="leaf-1">
                <a onClick={() =>fetch_tree(package_data.rapid_data.child6,id)} title={package_data.rapid_data.child6} >{package_data.rapid_data.child6 != null ? "**"+package_data.rapid_data.child6_data.user_id.slice(-4) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
                </li>
                
                
            </ul>
         </li>
         
      </ul>
      
   </div>

   <div onClick={() =>fetch_dashboard_info(package_data.rapid_data.self)} className='btn btn-primary'>Go to Root</div>
   
</div>
</div>

 
      </div>

      




      

      </div>


      <div className="card-badge label-purchased">Re-Entry Table</div>
      <Table striped bordered hover variant="dark">
      
  <thead>
    <tr>
      <th>#</th>
      <th>Re-entry Code</th>
      <th>Amount</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
  {package_data.rapid_fire_entry.map((generation,index) => (  
  
    
    <tr onClick={() =>fetch_tree(generation.self_id,id)}>
      <td>{index+1}</td>
      <td>{generation.self_id}</td>
      <td>{generation.amount}</td>
      <td>{generation.created_at}</td>

    </tr>
  ))}
    
  </tbody>
</Table>


      
    
    </main>

    
  );
};
    }
}

export default Rapid_tree;