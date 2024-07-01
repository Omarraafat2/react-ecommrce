import { createContext, useState } from "react";
import axios from "axios";

export let CartProductContext = createContext(0);

export default function CartProductContextProvider(props) {
  const [cartid, setCartid] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const headers = { token: localStorage.getItem("userToken") };

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((response) => {
        console.log("Add to Cart Response:", response);
        setCartid(response?.data.data._id);
        setCartCount((prevCount) => prevCount + 1);
        return response;
      })
      .catch((error) => {
        console.error("Error adding to cart:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
      });
  }

  function getProductToCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        console.log("Get Cart Products Response:", response);
        setCartid(response?.data.data._id);
        return response;
      })
      .catch((error) => {
        console.error("Error getting cart products:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
      });
  }

  function removeCartItem(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => {
        console.log("Remove Cart Item Response:", response);
        setCartid(response?.data.data._id);
        setCartCount((prevCount) => prevCount - 1);
        return response;
      })
      .catch((error) => {
        console.error("Error removing cart item:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
      });
  }

  function updateCartItem(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }
      )
      .then((response) => {
        console.log("Update Cart Item Response:", response);
        setCartid(response?.data.data._id);
        return response;
      })
      .catch((error) => {
        console.error("Error updating cart item:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
      });
  }

  function onlinePayment(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      )
      .then((response) => {
        console.log("Online Payment Response:", response);
        window.location.href = response?.data.session.url;
        return response;
      })
      .catch((error) => {
        console.error("Error in online payment:", error.response ? error.response.data : error.message);
        return Promise.reject(error);
      });
  }

  return (
    <CartProductContext.Provider
      value={{ addToCart, onlinePayment, getProductToCart, removeCartItem, updateCartItem, cartCount, setCartCount }}
    >
      {props.children}
      
    </CartProductContext.Provider>
  );
}
