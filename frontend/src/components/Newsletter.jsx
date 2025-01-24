import React from 'react'

const Newsletter = () => {
const onSubmitHandler=(event)=>{
    event.preventDefault();

}

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis temporibus voluptas repellendus totam quam aspernatur magnam sunt, facilis, earum similique esse at, tempore maxime. Voluptate nihil deleniti quam accusantium vel!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type='email' required className='w-full sm:flex-1 outline-none' placeholder='enter your email'/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default Newsletter