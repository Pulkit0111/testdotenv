const express=require("express")
const {UserModel}=require("../model/user.model")

const userRouter=express.Router()

//User Routes or User APIs
//Create
userRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try{
        const user=new UserModel(payload)
        await user.save()
        res.status(200).json({msg:"The new user has been registered", new_user:payload})
    } catch(err){
        res.status(400).json({error:err})
    }  
})

//Read
userRouter.get("/",async(req,res)=>{
    try{
        const users=await UserModel.find(req.query)
        res.status(200).json({users_data:users})
    } catch(err){
        res.status(400).json({error:err})
    }
})

//Update
userRouter.patch("/update/:userID",async(req,res)=>{
    const {userID}=req.params
    const payload=req.body
    try{
        await UserModel.findByIdAndUpdate({_id:userID},payload)
        res.status(200).json({msg:`The user with ID:${userID} has been updated`})
    } catch(err){
        res.status(400).json({error:err})
    }
})

//Delete
userRouter.delete("/delete/:userID",async(req,res)=>{
    const {userID}=req.params
    try{
        await UserModel.findByIdAndDelete({_id:userID})
        res.status(200).json({msg:`The user with ID:${userID} has been deleted`})
    } catch(err){
        res.status(400).json({error:err})
    }
})

module.exports={
    userRouter
}
