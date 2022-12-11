const express=require("express")
const app=express()
const route=require("./route/route")
const multer=require("multer")
const bodyParser=require("body-parser")
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



app.use(multer().any()) 





app.use("/",route)
app.listen(3000,()=>{
  console.log(`express app running on port ${3000}`);
})