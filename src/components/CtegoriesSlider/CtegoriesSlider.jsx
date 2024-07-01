import React, { useEffect, useState } from "react";
import Style from "./CtegoriesSlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CtegoriesSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed:2300,
  };
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    // console.log(data.data);
    setCategories(data.data);
    console.log(categories);
  }
  // console.log(data);
  useEffect(() => {
    getCategories();
  }, []);
  return <>
  {
      <div className="py-4 text-start" >
        <h2 className="py-4 text-gray-800 font-light text-2xl">Shoup Popular Categories</h2>
   <Slider {...settings}>
    {categories.map((category) => <div key={category._id} className="">
      <img className="category-img w-full" src={category.image} alt={category.name} />
      <h3>{ category.name}</h3>
           </div>)}
        </Slider> 
        </div>
}
  </>
}




