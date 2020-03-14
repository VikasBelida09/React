const User = require("../models/user")
exports.signout=(req,res)=>{
   res.send("marega tu bsdk")
 
}
exports.signup=(req,res)=>{
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err){
            return "madar chod error hai"
        }
        return res.json({
            name:user.name,
            id:user._id,
            email:user.email
        })
    })
}