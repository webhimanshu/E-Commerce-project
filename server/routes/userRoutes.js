const express = require("express");
const router = express.Router();
const auth=require('../middleware/auth');
const userCtrl = require("../controllers/userCtrl.js");


router.post("/register", userCtrl.register);

router.get("/refresh_token",userCtrl.refreshToken);

router.post("/login",userCtrl.login);

router.get("/logout",userCtrl.logout);

router.get("/infor",auth,userCtrl.getUser);

router.patch("/addtocart",auth,userCtrl.addCart)

router.get("/history",auth, userCtrl.history);

module.exports = router;
