import React, { useEffect, useState } from "react";
import Style from "./Categories.module.css";
import axios from "axios";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";

export default function Categories() {
  const [product, setProduct] = useState([]);

  async function getCtegoryApi() {
    let {data} = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    // console.log(data.data);
    setProduct(data?.data)
   
  }
  // console.log(product);
  useEffect(() => {
    getCtegoryApi();
  }, []);
  return (
    <>
      <div className="flex flex-wrap justify-center p-5 gap-5">
      {product.map((product) => (
        <div
          key={product._id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
        >
          <Link
            to={`/categoriesLink/${product._id}/${product.name}`}
            className="block overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <img
              className="w-full h-56 object-cover"
              src={product.image}
              alt={product.name}
            />
            <div className="p-4 bg-white">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
    </>
  );
}
