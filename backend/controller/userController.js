import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY)
}

// login route



const loginUser=async(req,res)=>{

    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user) 
        return res.status(404).json({message:"User not found"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) 
        return res.status(400).json({message:"Invalid password"});
        const token=createToken(user._id);
        res.json({token})
    } catch (error) {
        res.status(500).json({message:error.message})
        
        
    }

}

//register route

const registerUser=async(req,res)=>{

    try {
        const{name,email,password}=req.body;
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({
                sucess:false,
                message:"Email already exists"
            })
        }
        if(!validator.isEmail(email)){
            return res.json({sucess:false,message:"please enter a valid email"})
        }
        if(password.length<8){
            return res.json({sucess:false,message:"please enter a strong password"})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
        name,
        email,
        password:hashedPassword
        })

        const user= await newUser.save();

        const token=createToken(user._id);
        res.json({sucess:true,message:"user created successfully",token})

    }
    catch (error) {
        console.error(error)
        res.json({sucess:false,message:error.message})
        
    }
    
    
}

//admin login route

const adminLogin=async(req,res)=>{
    res.json({msg:"admin api is working"})

}

export {loginUser,registerUser,adminLogin}