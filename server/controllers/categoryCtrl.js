const { findOne } = require('../modal/categoryModel');
const Category=require('../modal/categoryModel');
const categoryCtrl=
{
getCategories:async(req,resp)=>
{
try{

    const categories= await Category.find();

     resp.json({categories});
}catch(err){
    return resp.status(500).json({msg:err.message});
}
}, 
createCategory: async (req,resp) =>
{
try
{
     //if user have role===1 ----> admin
    // only admin can create ,delete and update category

    const {name}=req.body;
    const category= await Category.findOne({name});

    if(category) return resp.status(400).json({msg:"This category already exists"});

    const newCategory = await Category({name});
    await newCategory.save();

    resp.status(200).json({msg:"Created a Category"});
        
}catch(err)
{
    return resp.status(500).json({msg:err.message});
}
},
deleteCategory:async (req,resp)=>
{
try{
      const id= req.params.id;
      await Category.findByIdAndDelete({_id:id});
      resp.status(200).json({msg:"Deleted a Category"}); 
}catch(err){
    return resp.status(500).json({msg:err.message});
}
},
updateCategory:async(req,resp)=>
{
    try{
        const {name}=req.body;

        await Category.findOneAndUpdate({_id:req.params.id},{name});

        resp.json({msg:"Update a Category"});
    }catch(err){
        return resp.status(500).json({msg:err.message})
    }
}
}
module.exports=categoryCtrl;