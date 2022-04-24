import axios from 'axios';
import React,{useState,useEffect} from 'react'

const UserAPI = (token) => {
    const[isLogged,setIsLogged]=useState(false);
    const[isAdmin,setIsAdmin]=useState(false);
    const[cart,setCart]=useState([]);
     const[history,setHistory]=useState([]);
     // when user make payment but it history componenet is not changed so we use callback
     const[callback,setCallBack]=useState(false);
  useEffect(()=>{
      if(token){
              
        
            const getUser= async ()=>{
             try{
 
                const res= await axios.get('/user/infor',{
                    headers: { Authorization : token }
                });
           
                setIsLogged(true);
                res.data.user.role === 1 ? setIsAdmin(true):setIsAdmin(false);
               

                //it will fetch cart from db and present ion screen 
               setCart(res.data.user.cart);
               console.log(res.data.user);
             }
            catch(err){
            
            console.log(err);
            }
                
            } 



          getUser();
      }
  },[token]);


  useEffect(()=>{
          if(token){
             const getHistory= async()=>{
               if(isAdmin){
                const res= await axios.get('/api/payment',{
                  headers:{Authorization:token}
                });
                
                setHistory(res.data);
               }else{
                const res= await axios.get('/user/history',{
                  headers:{Authorization:token}
                });
                setHistory(res.data.history);
               }
               
                    
                 
                  
                }
         getHistory();
                  }
  },[token,callback,isAdmin]);


   const addCart=async (product)=>{
   
    if(!isLogged) return window.alert('Please Login to continue Buying')

    
    // IT will check cart only contain unique product
    const check=cart.every(item=>
      {
        return item._id !== product._id;
      })
    
    if(check){
           setCart([...cart,{...product, quantity:1}]);

          const cartres= await axios.patch('/user/addtocart',
          {   cart:[...cart,{...product,quantity:1}] },{
             headers:{Authorization:token}
           })

           console.log(cartres);
         } else{
           window.alert("This Product has been added")
  }  

   }












  return{
      isLogged:[isLogged,setIsLogged],
      isAdmin:[isAdmin,setIsAdmin],
      addCart:addCart,
      cart:[cart,setCart],
      history:[history,setHistory],
      callback:[callback,setCallBack],
     
  }
}

export default UserAPI