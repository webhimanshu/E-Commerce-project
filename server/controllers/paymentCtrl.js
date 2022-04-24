const Payment=require('../modal/paymentModel');
const Users=require('../modal/userModel');
const Products=require('../modal/productModel');


const paymentCtrl={


    getPayments:async(req,resp)=>{
        try{
        const payments=await Payment.find();
      resp.json(payments);


        }catch(err){
         return resp.status(500).json({msg:err.message});
        }
    },

    createPayment:async (req,resp)=>{
        try{
         const user=await Users.findById(req.user.id).select("name email");
         if(!user) return resp.status(400).json({msg:"User does not exist"});


         const{cart,paymentID,address}=req.body;
         const{_id,name,email}=user;
         
         
        console.log(cart);
         const newPayment=new Payment({
         user_id:_id , name,email,cart,paymentID, address
         });
           
         // ITs not working
         cart.filter(item=>{
             return sold(item._id, item.quantity, item.sold)
         })


          await newPayment.save();
          resp.json({msg:"Payment Success"});

        }catch(err){
            return resp.status(500).json({msg:err.message});
        }
    }


};



// ITs not working
const sold= async (id,quantity,oldsold)=>{

const productr= await Products.findOneAndUpdate({_id:id},{
        sold:quantity+oldsold
    });
    console.log(productr);
}


module.exports=paymentCtrl;