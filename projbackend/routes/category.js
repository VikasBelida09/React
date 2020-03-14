const express=require('express')
const router=express.Router()

const {isAuthorised,isSignedin,isAdmin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {getCategoryById,createCategory,getAllCategories,getCategory}=require('../controllers/category')

router.param("userId",getUserById)
router.param("categoryId",getCategoryById)
router.post("/category/user/:categoryId",isSignedin,isAdmin,isAuthorised,createCategory)
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategories)
module.exports=router


