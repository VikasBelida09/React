const Product=require('../models/product')
const formidable=require('formidable')
const _=require('lodash')
const fs=require('fs')

exports.getProductById=(req,res,next,id)=>{
   Product.findById(id)
   .populate("category")
   .exec((err,product)=>{
       if(err){
           return res.status(400).json({
               error:"product not found"
           })
       }
       req.product=product
       next()
   })
}
exports.createProduct=(req,res)=>{
  let form=new formidable.IncomingForm();
  form.keepExtensions=true
  form.parse(req,(err,fields,file)=>{
      if(err){
          return res.status(400).json({
              error:"problem with image"
          })
      }
      const {name,description,price,category,stock}=fields
      console.log(fields)
      if(!name || !description || !price || !category || !stock){
           return res.status(400).json({
                error:"please include all the fields"
            })      
      }

      
      let product=new Product(fields)
      if(file.photo){
        if(file.photo.size>3000000){
            return res.status(400).json({
                error:"File size too big"
            })
        }
        product.photo.data=fs.readFileSync(file.photo.path)
        product.photo.contentType=file.photo.type
      }
      console.log(product)      

      product.save((err,product)=>{
          if(err){
              res.status(400).json({
                  error:"updation failed in DB"
              })
          }
          res.json(product)
      })
  })

}

exports.getProduct=(req,res)=>{
    return res.json(req.product)
}
exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data);
    }
}

exports.deleteProduct=(req,res)=>{
    let product=req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the product"
            })
        }
        res.json({
            message: "Deleted successfully",
            deletedProduct
        })
    })
    
}

exports.updateProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true
    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        
        let product=req.product
        product=_.extend(product,fields)
        if(file.photo){
          if(file.photo.size>3000000){
              return res.status(400).json({
                  error:"File size too big"
              })
          }
          product.photo.data=fs.readFileSync(file.photo.path)
          product.photo.contentType=file.photo.type
        }
        console.log(product)      
  
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error:err
                })
            }
            res.json(product)
        })
    })
  
}