const express=require('express')
const router=express.Router()
const User = require("../models/user")
const {check,ValidationResult}=require('express-validator')
const {signout,signup,signin}=require("../controllers/auth")
router.get("/signout",signout)
router.post(
    "/signup",
    [check("name","name should of min length 3").isLength({min:3})
]
,signup)
router.post(
    "/signin",
    [
        //check("name","name should of min length 3").isLength({min:3}),
        check("email","email is required and it should be in proper format").isEmail(),
        check("password","password is required and it should be of minimum 6 letters").isLength({min:3})
    ]
,signin)

module.exports=router