const express=require('express')

const router=express.Router()

const {
    isAdmin,
    isAuthorised,
    isSignedin
}=require('../controllers/auth')

const {
    updateStock
}=require('../controllers/product')

const {
    getUserById,
    pushOrdersinPurchaseList,
    
}=require('../controllers/user')

const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus}=require('../controllers/order')

router.param("userId",getUserById)
router.param("orderId",getOrderById)

router.post("/order/create/:userId",isSignedin,isAuthorised,pushOrdersinPurchaseList,updateStock,createOrder)
router.get(
    "/order/all/:userId",
    isSignedin,
    isAuthorised,
    isAdmin,
    getAllOrders
);
router.get("/order/status/:userId",isSignedin,isAuthorised,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedin,isAuthorised,isAdmin,updateStatus)
module.exports=router
