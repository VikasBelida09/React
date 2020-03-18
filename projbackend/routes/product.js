const express=require('express')
const router=express.Router()

const {
    isAdmin,
    isAuthorised,
    isSignedin
}=require('../controllers/auth')

const {
    getUserById
}=require('../controllers/user')

const { 
       getProductById, 
        createProduct,
        getProduct,
        photo,
        deleteProduct,
        updateProduct,
        getAllProducts,
        getAllCategories
    }=require('../controllers/product')

//params
router.param("userId",getUserById)
router.param("productId",getProductById)

//routes
router.post("/product/create/:userId",isSignedin,isAuthorised,isAdmin,createProduct)
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.delete("/product/:productId/:userId",isSignedin,isAuthorised,isAdmin,deleteProduct)
router.put("/product/:productId/:userId",isSignedin,isAuthorised,isAdmin,updateProduct)
router.get("/products",getAllProducts)
router.get("/products/categories",getAllCategories)
module.exports=router