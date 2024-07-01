import React, { useContext, useEffect, useState } from 'react';
import Style from './Products.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartProductContext } from '../../Context/CartProductContext';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

export default function Products() {
  const [counter, setCounter] = useState(0);
  
  let { addCart } = useContext(CartProductContext);
  
  const fetchProducts = () => {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then((response) => response)
      .catch((error) => error);
  }

  const { data, isError, isLoading, error, isFetched } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <div className='py-8 flex justify-center w-full'>
        <BeatLoader color="rgb(34 197 94)" />
      </div>
    );
  }

  // Onclick Cart
  async function addProductToCart(productId) {
    try {
      let response = await addCart(productId);
      console.log(response);
      if (response.data.status === "success") {
        toast.success("Product added successfully to your cart", {
          duration: 1500,
          position: 'bottom-right',
          style: {
            background: 'rgb(34, 197 ,94)',
            color: 'white'
          }
        });
      } else {
        toast.error("Error adding product to your cart", {
          duration: 1500,
          position: 'bottom-right',
          style: {
            background: 'rgb(34, 197 ,94)',
            color: 'white'
          }
        });
      }
    } catch (error) {
      toast.error("Error adding product to your cart", {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(34, 197 ,94)',
          color: 'white'
        }
      });
      console.log(error);
    }
  }

  return (
    <div className='flex flex-wrap flex-row px-5 py-8'>
      {data?.data.data.map((product) => (
        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-3 py-4">
          <div className="bg-white rounded-lg shadow-md transition duration-300 hover:shadow-xl">
            <Link to={`/productDetils/${product.id}/${product.category.name}`} className="block">
              <img className="w-full h-40 object-cover rounded-t-lg" src={product.imageCover} alt={product.title} />
              <div className="p-4">
                <span className="block font-light text-gray-600 mt-2">{product.category.name}</span>
                <h3 className="font-semibold text-gray-800 text-lg mt-2">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-gray-700">{product.price} EGP</span>
                  <span className="flex items-center text-yellow-400">
                    <i className="fas fa-star text-yellow-500 mr-1"></i>
                    <span>4.5</span> 
                  </span>
                </div>
              </div>
            </Link>
            <button onClick={() => addProductToCart(product.id)} className="block w-full py-2 bg-blue-500 text-white rounded-b-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-300">
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
