import jwt from 'jsonwebtoken';

const adminAuth=async (req,res,next)=>{

    try{
        const {token}=req.headers;
        if(!token)
            {
                return res.json({status:false,message:"invalid login no authorisation"})
            }
        const token_decode=await jwt.verify(token,process.env.SECRET_KEY);
        if(token_decode!== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({status:false,message:"invalid login no authorisation"})
        }
        next();

    }
    catch(error){
        console.log(error);
        return res.json({status:false,message:"invalid login no authorisation"})
    }

}


export default adminAuth;