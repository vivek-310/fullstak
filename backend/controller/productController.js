import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct=async(req,res)=>{

    try {
        
        const {name,description,price,category,subcategory,bestseller,sizes}=req.body;

        const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image2 && req.files.image2[0];
        const image3=req.files.image3 && req.files.image3[0];
        const image4=req.files.image4 && req.files.image4[0];

        const images=[image1,image2,image3,image4].filter((item)=>item!=undefined)

        const imagesurl=await Promise.all(
            images.map(async (item)=>{
                let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
            
        )

        const productData={
            name,
            description,
            price:Number(price),
            category,
            subcategory,
            bestseller:bestseller==='true'?true:false,
            sizes:JSON.parse(sizes),
            image:imagesurl,
            date:Date.now()

        }

        console.log(productData);

        const product=new productModel(productData);
        await product.save();

        res.json({sucess:true,message:"product is added"})
    } catch (error) {
        console.error(error)
        res.json({sucess:false,message:error.message
        })
    }

}

const listProducts=async(req,res)=>{

    try {
    const products=await productModel.find({});
    res.json(products);
    } catch (error) {
        console.error(error)
        res.json({sucess:false,message:error.message})
        }
}

const removeProduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({sucess:true,message:"product is removed"})
    }
    catch(error){
        console.error(error)
        res.json({sucess:false,message:error.message})

    }

}

const singleProduct=async(req,res)=>{
    try {
        const product=await productModel.findById(req.body.id);
        res.json(product);
    } catch (error) {
        console.error(error)
        res.json({sucess:false,message:error.message})
        
    }

}

export {listProducts,addProduct,singleProduct,removeProduct}