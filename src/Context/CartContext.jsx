import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useEffect } from "react";
import { useActionData } from "react-router-dom";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };
  const [cartCount, setCartCount] = useState(0);

// //   async function addCart(productId) {
// //      return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers}).then((response)=> response).catch((err)=>err)
// //   }

  function addToCart(productId) {
    return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId
        },
        {
          headers
        }
      )

      }
  

  async function getProductTOCart() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((err) => err);
  }
  async function remveCartItem(id) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
      .then((response) => response)
      .catch((error) => error);
  }
  async function UpdateCartItem(id, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        { headers }
      )
      .then((response) => response)
      .catch((error) => error);
  }
 
  return
  (
    <CartContext.Provider
      value={{ addToCart, getProductTOCart, remveCartItem, UpdateCartItem }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
