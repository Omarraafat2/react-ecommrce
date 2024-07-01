import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductDetils.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Products from "../Products/Products";
import { BeatLoader } from "react-spinners";
import { CartProductContext } from "../../Context/CartProductContext";
import toast from "react-hot-toast";
import useWish from "../../Hooks/useWish";
import { FaHeart } from "react-icons/fa";

export default function ProductDetils() {

  let { addToWish, isProductInWish } = useWish();

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





  let { addToCart } = useContext(CartProductContext);


    async function addProductToCart(productId) {
        try {
          let response = await addToCart(productId);
          console.log(response);
          if (response.data.status === "success") {
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
        } catch (error) {
          toast.error("Error adding product to your cart", {
            duration: 1500,
            position: 'bottom-right',
            style: {
              background: 'rgb(34, 197, 94)',
              color: 'white'
            }
          });
          console.error("Error adding product to cart:", error); // Improved error logging
        }
      }











  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  let { id, category } = useParams();
  const [productDetils, setProductDetils] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  async function getProductDetils(id) {
    let { data, category } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    // console.log(data);
    setProductDetils(data?.data);
  }
  async function getRelatedProduct(category) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    let allProducts = data.data;
    console.log(allProducts);
    let related = allProducts.filter((product) => product.category.name == category)
    // console.log(relatedProducts);
    setRelatedProducts(related)
    // allProducts.filter((product) => product.category.name == category);
    // setRelatedProducts(x)
  }

  useEffect(() => {
    getProductDetils(id);
    getRelatedProduct(category);
  }, [id, category]);
  if (productDetils==null) {
    return  <div className='py-8 flex justify-center w-full'>
      <BeatLoader color="rgb(34 197 94)" />
    </div>
  }
  return (
    <>
   <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap flex-col md:flex-row justify-center items-start bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/3 p-4">
          <Slider {...settings}>
            {productDetils?.images.map((src, index) => (
              <img
                key={index} // Use index as key if src is not unique
                className="w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                src={src}
                alt={productDetils?.title}
              />
            ))}
          </Slider>
        </div>
          <div className="w-full py-7 md:w-2/3 px-4">
            
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{productDetils?.title}</h1>
          <p className="text-lg font-light text-gray-600 mb-4">{productDetils?.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-green-600">{productDetils?.price} EGP</span>
            <span className="text-yellow-500 flex items-center">
              <i className="fas fa-star"></i>
              <span className="ml-1">4.5</span> {/* Example rating */}
            </span>
          </div>
          <button onClick={() => addProductToCart(productDetils.id)} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
            Add to cart
          </button>
          </div>
     
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Related Products</h2>
        <div className="flex flex-wrap -mx-2">
          {relatedProducts.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <Link to={`/productDetils/${product.id}/${product.category.name}`} className="block">
                  <img className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105" src={product.imageCover} alt={product.title} />
                  <div className="p-4">
                    <span className="block font-light text-gray-400 mt-4">{product.category.name}</span>
                    <h3 className="font-bold text-gray-600 mt-2">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                    <div className="flex justify-between items-center py-4">
                      <span className="font-bold text-gray-600">{product.price} EGP</span>
                      <span className="text-yellow-500 flex items-center">
                        <i className="fas fa-star"></i>
                        <span className="ml-1">4.5</span> {/* Example rating */}
                      </span>
                    </div>
                  </div>
                </Link>
                <button onClick={() => addProductToCart(product.id)} className="w-full py-2 bg-blue-500 text-white rounded-b-lg hover:bg-blue-600 transition-colors duration-300">
                  Add to cart
                </button>
              </div>
           
            </div>
          ))}
        </div>
      </div>
    </div>

    </>
  );
}
