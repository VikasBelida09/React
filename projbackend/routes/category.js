const express=require('express')
const router=express.Router()

const {isAuthorised,isSignedin,isAdmin}=require('../controllers/auth')
const {getUserById}=require('../controllers/user')
const {getCategoryById,createCategory,getAllCategories,getCategory,updateCategory,deleteCategory}=require('../controllers/category')

router.param("userId",getUserById)
router.param("categoryId",getCategoryById)
router.post("/category/create/:userId",isSignedin,isAuthorised,isAdmin,createCategory)
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategories)
router.put("/category/:categoryId/:userId",isSignedin,isAuthorised,isAdmin,updateCategory)
router.delete("/category/:categoryId/:userId",isSignedin,isAuthorised,isAdmin,deleteCategory)
module.exports=router


