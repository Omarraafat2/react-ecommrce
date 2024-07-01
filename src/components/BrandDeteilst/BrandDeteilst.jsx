import React, { useEffect, useState } from 'react';
import Style from './BrandDeteilst.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


export default function BrandDeteilst() {
  const [brandDetil, setBrandDetil] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);



  let { id ,category } = useParams();
  console.log(id);

  async function getProductDetils(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
    console.log(data);
    // setProductDetils(data?.data);
  }
  



//    function getBrandDetils(id) {
//      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`).then(( {data} ) => {console.log(data.data)}).catch((error) => error)
//  }

//   let  { data, isError, isLoading, error, isFetched }= useQuery({
//     queryKey: ['brandDetil'],
//     queryFn: getBrandDetils(id)
// })
// console.log(data);


async function getRelatedProduct(category) {
  let { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products`
  );
  let allProducts = data.data;
  console.log(allProducts);
  let related = allProducts.filter((product) => product.category.name == category)
  console.log(relatedProducts);
  setRelatedProducts(related)
  // allProducts.filter((product) => product.category.name == category);
  // setRelatedProducts(x)
}




  

  // console.log(x);
 
  useEffect(() => {
    getProductDetils(id)
    } , []);
  return <>
         <div className='flex py-64 text-gray-800  font-bold text-3xl flex-row justify-center items-center'>
        <h1>This product is Not available now </h1>
    </div>
  </>
}
