import { createContext, useEffect, useState} from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";


export const ShopContext = createContext();

const ShopContextProvider=(props)=>{
    const currency='$';
    const delivery_fee=10;
    const[search,setSearch]=useState('');
    const[showSearch,setshowSearch]=useState(false);
    const[cartItems,setCartItems]=useState({});

    const addToCart= async (itemId,size) => {

        if(!size){
            toast.error('please select size');
            return;
        }


        let cartData=structuredClone(cartItems);
          if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
}

    const getCartCount=()=>{
        let count=0;
        for(const item in cartItems){
            for(const size in cartItems[item]){
                try{
                    if(cartItems[item][size]>0){
                        count+=cartItems[item][size];
                    }
                }
                catch(error){

                }
            }
        }
        console.log(count);
        return count;
    }

    const updateQuantity=async (itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;
        setCartItems(cartData);

    }

    useEffect(()=>{
        console.log(cartItems);
        
    },[cartItems])

    const value={
       products,currency,delivery_fee,
       search,setSearch,showSearch,setshowSearch,
       cartItems,addToCart,getCartCount,updateQuantity
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;