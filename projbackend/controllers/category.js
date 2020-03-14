const Category=require('../models/category')

exports.getCategoryById=(req,res,next,id)=>{
 Category.findById(id).exec((err,cate)=>{
    if(err){
        return res.status(400).json({
            error:"category unavailable"
        })
    }
    res.category=cate     
 })

 next()
}
exports.createCategory=(req,res)=>{
    const category=new Category(req.body)
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"category unavailable"
            })  
        }
        res.json({category})
    })
}
exports.getCategory=(req,res)=>{
  return res.json(res.category)   
}
exports.getAllCategories=(req,res)=>{
   Category.find().exec((err,categ)=>{
        if(err){
            return res.status(400).json({
                error:"category unavailable"
            })  
        }
        res.json({categ})
   })      
}