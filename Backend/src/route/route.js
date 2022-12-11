const express=require("express")
const route=express.Router()
const controller=require("../controller/controller")

// const imageController=

route.post("/convert/image",controller.imageToText)

route.post("/convert/pdf",controller.pdfToText )

route.post("/convert/xl",controller.xlToText)

module.exports=route