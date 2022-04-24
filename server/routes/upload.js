const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");

// we will upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

// upload image can  only admin use
router.post("/upload",auth,authAdmin,(req, resp) => {
  try {
    console.log(req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      return resp.status(400).json({ msg: "No files were uploaded" });
    }
    const file = req.files.file;

    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return resp.status(400).json({ msg: "size to large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return resp.status(400).json({ msg: "File format is incorrect" });
    }
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "test" },
      async (err, result) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);
        resp.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    resp.status(500).json({ msg: err.message });
  }
});

// delete image
router.post("/destroy",auth,authAdmin,(req,resp)=>
{
  try{
      const {public_id}=req.body;
       if(!public_id) return resp.status(400).json({msg:"No images Selected"});

       cloudinary.v2.uploader.destroy(public_id, async(err, result)=>
       {
           if(err) throw err;

           resp.json({msg:"Deleted Image"});
       })

  }  catch(err){
      resp.status(500).json({msg:err.message});
  }
})





// it remove file bcoz every time  file are on server then it create tmp folder to store file
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
module.exports = router;
