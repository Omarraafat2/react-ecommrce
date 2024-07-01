import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useWish() {
  const [wishList, setWishList] = useState([]);
  let headers = { token: localStorage.getItem('userToken') };


    
    
  

  function removeFromWishList (productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
      .then((response) => {
        if (response.data.status === 'success') {
          setWishList([...wishList, productId]); // Update local wishlist state
          console.log(wishList);
        }
        return response;
      })
      .catch((error) => error);
  }
  function addToWish(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers })
      .then((response) => {
        if (response.data.status === 'success') {
          setWishList([...wishList, productId]); // Update local wishlist state
          
        }
        return response;
      })
      .catch((error) => error);
  }
   async function displayWishLogged() {
    try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
          headers
        });
        if (response.data.status === 'success') {
          setWishList(response.data.data); // Update local wishlist state
        }
        return response;
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        throw error;
      }
    }

  function isProductInWish(productId) {
    return wishList.includes(productId);
    }




    useEffect(() => {
        // Fetch wishlist on component mount
        
        axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
          .then((response) => {
            if (response.data.status === 'success') {
              setWishList(response.data.data);
            }
          })
          .catch((error) => {
            console.error('Error fetching wishlist', error);
          });
      }, []);

  return { addToWish, isProductInWish,setWishList, wishList,removeFromWishList ,displayWishLogged};
}
