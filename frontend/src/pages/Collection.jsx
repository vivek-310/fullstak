import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import Productitem from '../components/Productitem';
const Collection = () => {
  const {products} = useContext(ShopContext);
  const[showFilter,setShowFilter]=useState(false);
  console.log(products);
  const[filterproducts,setfilterproducts]=useState([]);

  const[category,setcategory]=useState([]);
  const[subCategory,setsubCategory]=useState([]);

  const[sortType,setsortType]=useState(['revelant']);

  const toggleCategory=(e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item!==e.target.value))

    }
    else{
      setcategory(prev=>[...prev,e.target.value])
    }

  }

  const togglesubCategory=(e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=>prev.filter(item=>item!==e.target.value))

    }
    else{
      setsubCategory(prev=>[...prev,e.target.value])
    }

  }

  const applyFilter=()=>{
    let productsCopy=products.slice();
    if(category.length>0){
      productsCopy=productsCopy.filter(item=>category.includes(item.category))
    }
    if(subCategory.length>0){
      productsCopy=productsCopy.filter(item=>subCategory.includes(item.subCategory));
    }

    setfilterproducts(productsCopy);
  }


  const sortProduct=()=>{
    applyFilter();
    let fp=filterproducts.slice();
    switch(sortType){
      case 'low-high':
        setfilterproducts(fp.sort((a,b)=>a.price-b.price));
        break;
      case 'high-low':
        setfilterproducts(fp.sort((a,b)=>b.price-a.price));
        break;
      default:
        applyFilter();
    }
  }

useEffect(()=>{
  console.log(subCategory);
  console.log(category);
  applyFilter();

},[category,subCategory]);

  useEffect(()=>{
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/*  filter*/}
        <div className='min-w-60'>
          <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={()=>setShowFilter(!showFilter)}>FILTERS
            <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} alt='dropdown'/>
          </p>
          {/* catgeory */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter?'':'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input className='w-3' value={'Men'} onChange={toggleCategory} type='checkbox'/>
                Men
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' value={'Women'} onChange={toggleCategory} type='checkbox'/>
                Women
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' value={'Kids'} onChange={toggleCategory} type='checkbox'/>
                Kids
                </p>
              </div>
          </div>
          {/* subcateory*/}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter?'':'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>TYPE</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                  <input className='w-3' value={'Topwear'} onChange={togglesubCategory} type='checkbox'/>Topwear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' value={'Bottomwear'} onChange={togglesubCategory} type='checkbox'/>Bottomwear
                </p>
                <p className='flex gap-2'>
                  <input className='w-3' value={'Winterwear'} onChange={togglesubCategory} type='checkbox'/>Winterwear
                </p>
              </div>
          </div>
        </div>
        {/* another side*/}
        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTION'}/>
            <select onChange={(e)=>{setsortType(e.target.value)}} className='border-2 border-gray-300 text-sm px-2'>
              <option value='revelant'>Sort by:Revelant</option>
              <option value='low-high'>Sort by:low to high</option>
              <option value='high-low'>Sort by:high to low</option>
            </select>

          </div>
          {/**map */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterproducts.map((item,index)=>(
                  <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
              }

          </div>

        </div>
    </div>
  )
}

export default Collection