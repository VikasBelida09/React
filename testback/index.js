const express=require("express")
const app=express()
const port=3000
app.get("/signup",(req,res)=>{res.send("Hello you are in signup page")})
const hello=(req,res)=>{res.send("Hello you are in signup page")}
const isLogged=(req,res,next)=>{res.send("Hello you are in signup page")}
app.get("/signup",isLogged,hello)
app.listen(port,()=>{console.log("server is listening")})
