//libraries
require('dotenv').config()
const mongoose=require("mongoose")
const express=require("express")
const app=express()
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//db conection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
      useCreateIndex:true
}).then(()=>{console.log("DB CONNECTED")}).catch(()=>{
    console.log("Error occured")
});
//routes

app.use('/api',authRoutes)
app.use('/api',userRoutes)


//port
const port=process.env.PORT

//starting server
app.listen(port,()=>{
    console.log(`App is running at ${port} `)
})