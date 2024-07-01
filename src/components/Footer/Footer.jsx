import React, { useEffect, useState } from 'react';
import Style from './Footer.module.css';
import Amazon from '../../assets/images/Amazon_logo.svg';
import Amiracn from '../../assets/images/american-express.svg';
import MasterCard from '../../assets/images/master.png';
import appStore from '../../assets/images/app-store.svg';
import google from '../../assets/images/google-play.svg';

export default function Footer() {
    // const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
    return <>
      
   <div className="bg-slate-300 w-full    px-24 py-10">
  <div className="text-start">
    <h2 className="text-2xl font-bold text-gray-800">Get the FreshCar app</h2>
    <p className=" font-light text-gray-600">We will send you a link, open it on your phone to download the app</p>
  </div> 
  <div>
    <form className="flex  items-center mt-5  ms-4">   
      <label htmlFor="voice-search" className="sr-only text-red-500">Search</label>
      <div className="relative w-3/4  ">
        <input type="text" id="voice-search" className="bg-gray-50 border py-5   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
        <button type="button" className="absolute inset-y-0 end-0  flex items-center pe-3">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
          </svg>
        </button>
      </div>
      <button className="border hover:scale-95 duration-300 relative group cursor-pointer text-white overflow-hidden h-16 w-64 rounded-md bg-blue-200 p-2 flex justify-center items-center font-extrabold">
  <div className="absolute right-32 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-40 h-40 rounded-full group-hover:scale-150 duration-500 bg-green-900"></div>
  <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-green-800"></div>
  <div className="absolute -right-12 top-4 group-hover:top-1 group-hover:right-2 z-10 w-24 h-24 rounded-full group-hover:scale-150 duration-500 bg-green-700"></div>
  <div className="absolute right-20 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150 duration-500 bg-green-600"></div>
  <p className="z-10">See more</p>
</button>

          </form>
          <div className='flex flex-row justify-between items-center my-5 border border-s-0 border-e-0 py-5 px-3 border-gray-400'>
            <div className='w-1/3 flex items-center gap-4'>
              <h3 className="text-lg font-bold text-gray-700">Payment Parteners</h3>
              <div className='flex flex-row items-center gap-4 pt-2 '>
                <a href="https://www.amazon.com/"><img className='w-12 ' src={Amazon} alt="Amazon" /></a>
                <a href="https://www.americanexpress.com/"><img className='w-12 ' src={Amiracn} alt="Amazon" /></a>
                <a href="https://www.mastercard.us/"><img className='w-12' src={MasterCard} alt="Amazon" /></a>
              </div>
            </div>
            <div className='w-1/3 flex items-center  gap-4 '>
              <h3 className="text-lg font-bold text-gray-700  ">Get deliveries with FreshCart</h3>
              <div className='flex flex-row items-center gap-4 pt-2  '>
                <a href="https://www.apple.com/app-store/"><img className='w-40' src={appStore} /></a>
                <a href="https://play.google.com/"><img className='w-40' src={google} /></a>
             </div>

            </div>
          </div>
  </div>
</div>

  </>
}
