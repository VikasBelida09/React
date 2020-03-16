const express=require('express')
const router=express.Router()

const {isAdmin,isAuthorised,isSignedin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct}=require('../controllers/product')

//params
router.param("userId",getUserById)
router.param("productId",getProductById)

//routes
router.post("/product/create/:userId",isSignedin,isAuthorised,isAdmin,createProduct)
router.get("product/:productId",getProduct)
router.get("product/photo/:productId",photo)
router.delete("product/:productId/:userId",deleteProduct)
router.put("product/:productId/:userId",updateProduct)
module.exports=router