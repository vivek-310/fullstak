import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';

const LatestCollection = () => {
    const {products}=useContext(ShopContext);
    const[latestProducts,setlatestProducts]=useState([]);

    useEffect(
        ()=>{
            setlatestProducts(products.slice(0,10));
        },[]
    )

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl '>
            <Title text1={'LATEST'} text2={'COLLECTION'} />

        </div>
            {/* products*/}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    latestProducts.map((item,index)=>(
                        <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))
                }
            </div>

    </div>
  )
}

export default LatestCollection