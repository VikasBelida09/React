const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;
const productCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:String,
    price:Number,
    count:String,
})
const ProductCart=mongoose.model("ProductCart",productCartSchema)

const orderSchema=new mongoose.Schema({
      products:[productCartSchema],
      transaction_id:{},
      ammount:Number,
      address:String,
      updated:Date,
      user:{
          type:ObjectId,
          ref:"User",
          required:true
      }
},{timestamps:true}
);
const Order=mongoose.model("Order",orderSchema)
module.exports={Order,ProductCart}