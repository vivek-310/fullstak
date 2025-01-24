import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Productitem from './Productitem'
const BestSeller = () => {
    const {products} = useContext(ShopContext);

    const[BestSeller,setBestaseller]=useState([]);

    useEffect(()=>{
      const bestSeller = products.filter((item) => item.bestseller === true);
      setBestaseller(bestSeller.slice(0,5));

    },[])
  return (
    <div className='my-10'>
         <div className='text-center py-8 text-3xl '>
            <Title text1={'BEST'} text2={'BESTSELLER'} />

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            BestSeller.map((item,index)=>(
              <Productitem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />

            ))
          }
        </div>

    </div>
  )
}

export default BestSeller