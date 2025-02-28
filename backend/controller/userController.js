import userModel from "../models/userModel";
import validator from "validator";
import bcrypt from "bcryptjs";



// login route



const loginUser=async(req,res)=>{

}

//register route

const registerUser=async(req,res)=>{

    try {
        const{name,email,password}=req.body;
        const exists=userModel.findOne({email});
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
    }
    catch (error) {
        
    }
    
    
}

//admin login route

const adminLogin=async(req,res)=>{
    res.json({msg:"admin api is working"})

}

export {loginUser,registerUser,adminLogin}