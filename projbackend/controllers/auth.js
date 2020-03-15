const User = require("../models/user")
const {check,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const expressJwt=require('express-jwt')

exports.signout=(req,res)=>{
   res.clearCookie("token")
   res.json({
       message:"User Signout Successfully"
   })
 
}
exports.signup=(req,res)=>{
    console.log(req.body)
    const user=new User(req.body)
    console.log(user)
    const errors=validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    user.save((err,user)=>{
        if(err){
            return res.send(err)
        }
        return res.send(user)
    })
}
exports.signin=(req,res)=>{
    const {password,email}=req.body
    const errors=validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"user doesnt exists in our database"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"email and password doesnt match"
            })
        }
        const token=jwt.sign({_id:user.id},process.env.SECRET)

        res.cookie("token",token,{expire:new Date() + 9999})

        const {email,_id,name,role}=user
        return res.json({
            token,
            user:{
                _id,
                name,
                email,
                role
            }
        })
    })
}
exports.isSignedin=expressJwt({
     secret:process.env.SECRET,
     userProperty:"auth"
});

exports.isAuthorised=(req,res,next)=>{
    let checker=req.profile && req.auth && req.profile._id == req.auth._id
    console.log(req.profile)
    console.log(req.auth)
    if(!checker){
       res.status(403).json({
           msg:"Access denied because you are unauthorised"
       })     
    }
    next()
}

exports.isAdmin=(req,res,next)=>{
    if(req.profile.role==0){
        res.status(403).json({
            msg:"Access denied because you are not an admin"
        })
    }
    next()
}