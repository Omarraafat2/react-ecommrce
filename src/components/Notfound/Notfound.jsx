import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import Eror from '../../assets/images/error.svg';


export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <div className='flex justify-center'>
      <img src={Eror} alt="Error" className='py-10' />
      
  </div>
  
  </>
}
