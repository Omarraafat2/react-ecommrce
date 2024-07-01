import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';


export default function Brands() {
  const [counter, setCounter] = useState(0);
  


  function getBrands()
  {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)

}
  let { data,isError,isFetched,isLoading,error } = useQuery({
    queryKey: ['brands'],
    queryFn:getBrands,
})
// if (isLoading) {
//   return <div className='py-8 flex justify-center w-full'>
//     <BeatLoader color="rgb(34 197 94)" />
//   </div>
// }
// if (isError) {
//   return <div className='py-8 flex justify-center w-full'>
//     <h3 className='text-red-600'>{error}</h3>
//   </div>
  // }
  function specificBrand(productId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${productId}`)
      .then((response) => response)
      .catch((error) => error)
  }

    useEffect(()=>{

    } , []);
  return <>
     <div className='flex flex-wrap justify-start items-center px-5 py-8'>
      {data?.data.data.map((product) => (
        <div key={product._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 py-4'>
          <div className='product text-start'>
            <Link to={`/brandDetils/${product._id}`}>
              <img className='w-full rounded-lg' src={product.image} alt={product.title} />
              <span className='block font-light text-slate-400 mt-4 hover:text-lime-400 hover:scale-125 text-center'>{product.name}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
    
  </>
}
