const express=require('express')
const router=express.Router()

const {isAdmin,isAuthorised,isSignedin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {getProductById,createProduct}=require('../controllers/product')

//params
router.param("userId",getUserById)
router.param("productID",getProductById)

//routes
router.post("/product/create/:userId",isSignedin,isAuthorised,isAdmin,createProduct)

module.exports=router