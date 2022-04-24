const Users = require("../modal/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payments=require("../modal/paymentModel");
const userCtrl = {
  register: async (req, resp) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return resp
          .status(400)
          .json({ msg: "email is already present use another email " });
      if (password.length < 6)
        return resp
          .status(400)
          .json({ msg: "password aleast 6 character long" });

      // Password Encryption or Hashing

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = await Users({
        name: name,
        email: email,
        password: passwordHash,
      });

      // save in mongodb
      await newUser.save();

      //Then create jsonwebtoken for authentication
      const accessToken = craeteAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      // saving refresh token in cookie
      resp.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      resp.json({ accessToken });
    } catch (err) {
      return resp.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, resp) => {
    try {
      const rf_token = req.cookies.refreshToken;
     
      if (!rf_token)
        return resp.status(400).json({ msg: "Please Login or Register" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return resp.status(500).json({ msg: "Please Login or Register" });

        const accessToken = craeteAccessToken({ id: user._id });

        resp.json({ accessToken });
      });
      //    return resp.json({rf_token})
    } catch (err) {
      return resp.status(500).json({ msg: err.message });
    }
  },
  login: async (req, resp) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) return resp.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return resp.status(400).json({ msg: "Invalid User or Password" });

      //If login succesfull then create accesstoken and refresh token
      const accessToken = craeteAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      resp.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_Token",
      });

     resp.json({accessToken});

    } catch (err) {
      return resp.status(500).json({ msg: err.message });
    }
  },
  logout:async (req,resp)=>
  {
try{
   resp.clearCookie('refreshToken',{path:'/user/refresh_Token'});
   resp.json({msg:"Logged Out"})
}catch(err)
{
  return resp.status(500).json({msg:err.message});
}
  },
  getUser:async(req,resp)=>
  {
    try{
      console.log( "user id",req.user.id);
     const user=await Users.findById(req.user.id).select('-password');// select() it will remove password field the send as resp
   
     if(!user) return resp.status(400).json({msg:"User does not exist."});


     resp.json({user});// id of user
    }catch(err){
      return resp.status(500).json({msg:err.message});
    }


  },
  addCart:async (req,resp)=>{
    try{
      const user=await Users.findById(req.user.id);
      if(!user) return resp.status(400).json({msg:"User does not exists."})
    

       await Users.findOneAndUpdate({_id:req.user.id},{
         cart:req.body.cart
       })

       return resp.json({msg: "Added to cart"})
    }catch(err){
      return resp.status(500).json({msg:err.message})
    }
  },
  history: async (req,resp)=>{
    try{
      console.log(req.user)
     const history= await Payments.find({user_id:req.user.id});
                resp.json({history})
    }catch(err){
      return resp.status(500).json({msg:err.message})
    }
  }
};
const craeteAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
module.exports = userCtrl;
