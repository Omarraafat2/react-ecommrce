import React from 'react'
import { CartProductContext } from '../Context/CartProductContext';
import axios from 'axios';

export default function useAddTocart() {

    let { addCart } = useContext(CartProductContext);


    async function addProductToCart(productId) {
        try {
          let response = await addCart(productId);
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
  return addProductToCart(productId)
}
