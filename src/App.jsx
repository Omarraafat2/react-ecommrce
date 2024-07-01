import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import UserContextProvider from "./Context/UserContext";
import ProtactedRoute from "./components/ProtactedRoute/ProtactedRoute";
import ProductDetils from "./components/ProductDetils/ProductDetils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import toast, { Toaster } from "react-hot-toast";
import CartProductContextProvider from "./Context/CartProductContext";
import BrandDeteilst from "./components/BrandDeteilst/BrandDeteilst";
import CategoryLink from "./components/CategoryLink/CategoryLink";
import React from 'react';
import ReactDOM from 'react-dom';
import About from "./components/About/About";
import Wishlist from "./components/Wish/Wish";
import Payment from "./components/Payment/Payment";
import WishProductContextProvider from "./Context/WishContext";
import Allorders from "./components/Allorders/Allorders";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import RestPassword from "./components/RestPassword/RestPassword";


let query = new QueryClient();
let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtactedRoute>
            <Home />
          </ProtactedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtactedRoute>
            <Products />
          </ProtactedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtactedRoute>
            <Cart />
          </ProtactedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtactedRoute>
            <About />
          </ProtactedRoute>
        ),
      },
      {
        path: "forgetpassword",
        element: (
            <ForgetPassword/>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtactedRoute>
            <Wishlist/>
          </ProtactedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtactedRoute>
            <Brands />
          </ProtactedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtactedRoute>
            <Allorders />
          </ProtactedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtactedRoute>
            <Payment />
          </ProtactedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtactedRoute>
            <Categories />
          </ProtactedRoute>
        ),
      },
      {
        path: "categoriesLink/:id/:category",
        element: (
          <ProtactedRoute>
            <CategoryLink />
          </ProtactedRoute>
        ),
      },
      {
        path: "productDetils/:id/:category",
        element: (
          <ProtactedRoute>
            <ProductDetils />
          </ProtactedRoute>
        ),
      },
      {
        path: "brandDetils/:id",
        element: (
          <ProtactedRoute>
            <BrandDeteilst />
          </ProtactedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "restCode", element: <RestPassword /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  const [count, setCount] = useState(0);

  return (
    <CartProductContextProvider>
    <WishProductContextProvider>
    
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster></Toaster>
          <ReactQueryDevtools />
        </UserContextProvider>
      </QueryClientProvider>
      </WishProductContextProvider>
      </CartProductContextProvider>

  );
}

export default App;
