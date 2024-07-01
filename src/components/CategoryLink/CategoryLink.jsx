import React, { useEffect, useState,useContext  } from 'react';
import Style from './CategoryLink.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { CartProductContext } from '../../Context/CartProductContext';
import toast from 'react-hot-toast';

export default function CategoryLink() {
  let { addToCart } = useContext(CartProductContext);
  async function addProductToCart(productId) {
   
    // console.log(response);
    let response = await addToCart(productId);

  if (response?.data?.status === "success") {
      toast.success("Product added successfully to your cart", {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(34, 197, 94)',
          color: 'white'
        }
      });  } else {
        toast.error("Error adding product to your cart", {
                duration: 1500,
                position: 'bottom-right',
                style: {
                  background: 'rgb(34, 197, 94)',
                  color: 'white'
                }
              });
            
  }
  //   if (response.data.status === "success") {
  //     toast.success("Product added successfully to your cart", {
  //       duration: 1500,
  //       position: 'bottom-right',
  //       style: {
  //         background: 'rgb(34, 197, 94)',
  //         color: 'white'
  //       }
  //     });
  //   } else {
  //     toast.error("Error adding product to your cart", {
  //       duration: 1500,
  //       position: 'bottom-right',
  //       style: {
  //         background: 'rgb(34, 197, 94)',
  //         color: 'white'
  //       }
  //     });
  //   }
  // } catch (error) {
  //   toast.error("Error adding product to your cart", {
  //     duration: 1500,
  //     position: 'bottom-right',
  //     style: {
  //       background: 'rgb(34, 197, 94)',
  //       color: 'white'
  //     }
  //   });
  //   console.error("Error adding product to cart:", error); // Improved error logging
  
}


  let { id , category} =useParams()

console.log(id)
console.log(category)



  const [relatedProducts, setRelatedProducts] = useState([]);
  
  async function getProductDetils() {
    let { data, name,category } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    // console.log(data);
    // setProductDetils(data?.data);
  }



  async function getRelatedProduct(category) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    let allProducts = data?.data;
    console.log(allProducts);
    let related = allProducts.filter((product) => product?.category.name == category)
    console.log(related);
    setRelatedProducts(related)
  

    // allProducts.filter((product) => product.category.name == category);
    // setRelatedProducts(x)
  }
  // console.log(relatedProducts);
// console.log(relatedProducts);

  useEffect(() => {
    getProductDetils()
    getRelatedProduct(category)

    } , []);
  return <>

    
<div className="flex flex-wrap flex-row px-5 py-8 bg-gray-50">
      {relatedProducts.map((product) => (
        <div key={product.id} className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-3 py-4">
          <div className="product text-start bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <Link to={`/productDetils/${product.id}/${product.category.name}`} className="block">
              <img className="w-full h-48 object-cover rounded-t-lg" src={product.imageCover} alt={product.title} />
              <div className="p-4">
                <span className="block font-light text-slate-400 mt-4">{product.category.name}</span>
                <h3 className="font-bold text-slate-600">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                <div className="flex justify-between items-center py-4">
                  <span className="font-bold text-slate-600">{product.price} EGP</span>
                  <span className="font-bold text-yellow-400 flex items-center">
                    <FaStar />
                    <span className="ml-1">4.5</span> {/* Example rating */}
                  </span>
                </div>
              </div>
            </Link>
            <button onClick={() => addProductToCart(product.id)} className="btn w-full py-2 bg-blue-500 text-white rounded-b-lg hover:bg-blue-600 transition-colors duration-300">
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>

  </>
}
