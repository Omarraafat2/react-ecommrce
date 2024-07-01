import React, { useEffect, useState } from 'react';
import Style from './CategoriesDetils.module.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Products from "../Products/Products";
import { BeatLoader } from "react-spinners";

export default function CategoriesDetils() {
  let { id, category } = useParams();
  const [productDetils, setProductDetils] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
   console.log(id);
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
    // console.log(allProducts);
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
      <div className="flex flex-wrap flex-row justify-center items-center">
        <div className="w-1/4 ">
          <Slider {...settings}>
            {productDetils?.images.map((src) => (
              <img
                key={productDetils?._id}
                className="w-full"
                src={src}
                alt={productDetils?.title}
              />
            ))}
          </Slider>
          {/* <img className='w-full' src={productDetils?.imageCover} alt={productDetils?.title} /> */}
        </div>
        <div className="w-3/4  text-start px-8">
          <h1 className="font-bold text-slate-950 ">{productDetils?.title}</h1>
          <p className="font-light text-slate-600 ">
            {productDetils?.description}
          </p>
          <div className="flex justify-between items-center px-5 my-4 ">
            <span className="font-bold text-slate-600">
              {productDetils?.price} EGP
            </span>
            <span className="font-bold text-yellow-400">
              <i className="fas fa-star text-yellow"></i>
            </span>
          </div>
          <button className="btn"> Add to cart</button>
        </div>
      </div>
      <div className="flex flex-wrap flex-row py-10">
      {relatedProducts.map((product) =>
     
        <div key={product.category._id} className="w-1/6">

        <div className='product text-start'>
          <Link to={`/productDetils/${product.id}/${product.category.name}`}>            {/* eror /${product.category.name} */}
            <img className='w-full' src={product.imageCover} alt={product.title} />
            <span className='block font-light text-slate-400 mt-4 '>{product.category.name}</span>
          <h3 className='font-bold text-slate-600  '>{product.title.split(' ').slice(0, 2).join('')}</h3>           {/* el slice aktr men 2 !!!eror*/}
          <div className='flex justify-between items-center py-4 '>
            <span className='font-bold text-slate-600'>{product.price} EGP</span>
            <span className='font-bold text-yellow-400'><i className='fas fa-star text-yellow'></i></span>
          </div>
          <button className='btn'> Add to cart</button>
          </Link>

        </div>
        </div>
        )}
        </div> 

    </>
  );
}
