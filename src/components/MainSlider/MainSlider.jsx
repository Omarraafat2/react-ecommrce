import React, { useEffect, useState } from 'react';
import Style from './MainSlider.module.css';
import Slider from "react-slick";

import mainImge from '../../assets/images/mainimg.jpeg';
import mainImge1 from '../../assets/images/blog-img-1.jpeg';
import mainImge2 from '../../assets/images/blog-img-2.jpeg';
import img2 from '../../assets/images/slider-image-1.jpeg';
import img3 from '../../assets/images/slider-image-2.jpeg';

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
   <div className="flex flex-wrap">
      <div className="w-full md:w-3/4">
        <Slider {...settings}>
          <div>
            <img src={mainImge} className="w-full  h-[400px]  " alt="Main Image" />
          </div>
          <div>
            <img src={mainImge1} className="w-full h-[400px]" alt="Main Image 1" />
          </div>
          <div>
            <img src={mainImge2} className="w-full  h-[400px]" alt="Main Image 2" />
          </div>
        </Slider>
      </div>
      <div className="w-full md:w-1/4 md:mt-0 mt-4">
        <img src={img2} className="w-full md:h-[200px] h-auto " alt="Image 2" />
        <img src={img3} className="w-full md:h-[200px] h-auto" alt="Image 3" />
      </div>
    </div>
  </>
}
