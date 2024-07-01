import React, { useEffect, useState } from 'react';
import Style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  // const [counter, setCounter] = useState(0);
  useEffect(() => {

  }, []);
  return <>
    {/* <div className="dark:bg-gray-800 dark:text-white"> */}
    <Navbar />
    <div className="container py-20 mx-auto p-8 mt-8">
      <Outlet></Outlet>

    </div>
      <Footer />
      {/* </div> */}
  </>
}
