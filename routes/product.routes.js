const express=require("express")
const {ProductModel}=require("../model/product.model")

const productRouter=express.Router()

//Product Routes or Product APIs
productRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try{
        const product=new ProductModel(payload)
        await product.save()
        res.status(200).json({msg:"The new product has been added", new_product:payload})
    } catch(err){
        res.status(400).json({error:err})
    }  
})

//Read
productRouter.get("/",async(req,res)=>{
    try{
        const products=await ProductModel.find(req.query)
        res.status(200).json({products_data:products})
    } catch(err){
        res.status(400).json({error:err})
    }
})

module.exports={
    productRouter
}