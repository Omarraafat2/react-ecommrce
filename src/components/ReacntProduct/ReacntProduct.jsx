import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { CartProductContext } from '../../Context/CartProductContext';
import { WishProductContext } from '../../Context/WishContext';

export default function ReacntProduct() {
  const { addToCart, cartCount, setCartCount } = useContext(CartProductContext);
  const { addToWish, isProductInWish } = useContext(WishProductContext);

  // Wish
  async function addWish(productId) {
    let response = await addToWish(productId);
    if (response?.data?.status === 'success') {
      toast.success('Product added to wishlist!', {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(34, 197, 94)',
          color: 'white',
        },
      });
    } else {
      toast.error('Error adding product to wishlist', {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(34, 197, 94)',
          color: 'white',
        },
      });
    }
  }

  // Add to cart when click btn
  async function addProductToCart(productId) {
    let response = await addToCart(productId);

    if (response?.data?.status === "success") {
      setCartCount(cartCount + 1); // Update cart count
      toast.success("Product added successfully to your cart", {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(34, 197, 94)',
          color: 'white'
        }
      });
    } else {
      toast.error("Error adding product to your cart", {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(34, 197, 94)',
          color: 'white'
        }
      });
    }
  }

  // Fetch products using react-query
  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      .then((response) => response)
      .catch((error) => error);
  }

  let { data, isError, isLoading, error } = useQuery({
    queryKey: ['reacntProducts'],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <div className='py-8 flex justify-center w-full'>
        <BeatLoader color="rgb(34 197 94)" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='py-8 flex justify-center w-full'>
        <h3 className='text-red-600'>{error.message}</h3> {/* Improved error display */}
      </div>
    );
  }

  return (
    <div className='py-3'>
      <div className="flex flex-wrap flex-row px-5 py-8 bg-gray-50">
        {data?.data.data.map((product) => (
          <div key={product.id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-3 py-4 relative group">
            <div className="product text-start bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative overflow-hidden flex flex-col h-full">
              <Link to={`/productDetils/${product.id}/${product.category.name}`} className="block">
                <img className="w-full h-48 object-cover rounded-t-lg" src={product.imageCover} alt={product.title} />
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="block font-light text-slate-400 mt-4">{product.category.name}</span>
                    <h3 className="font-bold text-slate-600">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                  </div>
                  <div className="flex justify-between items-center py-4">
                    <span className="font-bold text-slate-600">{product.price} EGP</span>
                    <span className="font-bold text-yellow-400 flex items-center">
                      <FaStar />
                      <span className="ml-1">4.5</span> {/* Example rating */}
                    </span>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => addProductToCart(product.id)}
                className="btn w-full py-2 bg-blue-500 text-white rounded-b-lg hover:bg-blue-600 transition-colors duration-300 absolute bottom-0"
              >
                Add to cart
              </button>
            </div>
            <button
              onClick={() => addWish(product.id)}
              className={`absolute top-4 right-4 bg-white rounded-full p-2 shadow-md transition-colors duration-300 group-hover:block ${
                isProductInWish(product.id) ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              <FaHeart className="text-xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
