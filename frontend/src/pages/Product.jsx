import React, { useEffect, useState ,useContext} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId}=useParams();
  const {products,currency}=useContext(ShopContext);
  const[productdata,setProductdata]=useState(false);
  const[image,setImage]=useState('');
  const[size,setSize]=useState('');

  const fetchProductdata=async ()=>{
    products.map((item)=>{
      if(item._id===productId){
        setProductdata(item)
        setImage(item.image[0]);
        console.log(item)
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductdata();
  },[productId,products]);

  return productdata? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/*product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
             {
              productdata.image.map((item,index)=>(
                <img onClick={()=>setImage(item)}  src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt='product'/>
              ))
              }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt='image'/>
              
          </div>

        </div>
        {/*product details */}
        <div className='flex-1'>
          <h1 className='font-medium'>{productdata.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productdata.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5 '>{productdata.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productdata.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size?'border-orange-500':''}`} key={index}>{item}</button>
              ))}

            </div>

          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>

          </div>
        </div>
      </div>

      {/*review and description */}
      <div className='mt-20'>
              <div className='flex'>
                <b className='border px-5 py-3 text-sm'>Description</b>
                <p className='border px-5 py-3 text-sm'>Reviews(122)</p>
                
              </div>
              <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
              </div>
      </div>
              {/* display related products*/}
              <RelatedProducts category={productdata.category} subCategory={productdata.subCategory}/>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product