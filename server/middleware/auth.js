// this auth work when we want to fetch user datails after login
//we send from fronend key:Authentication  value:refreshtoken and that gives us  user id  
const jwt = require("jsonwebtoken");
const auth = (req, resp, next) => {
  try {

     const token = req.header("Authorization");
    //  const token =  `${eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDk3Mzg4NjAsImV4cCI6MTY0OTgyNTI2MH0.ySr4RCZSe9R2ap2yRjqa5EV5CuPP_TZwvz7yXdsnbkI}`
     
    
     console.log(token)

    if (!token) return resp.status(400).json({ msg: "Invalid Authentication" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return resp.status(400).json({ msg: "Invalid Authentication" });

      console.log(user);
      
      req.user = user;

      next();
    });
  } catch (err) {
    return resp.status(500).json({ msg: err.msg });
  }
};
module.exports = auth;
