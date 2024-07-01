import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartProductContext } from '../../Context/CartProductContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const { getProductToCart, removeCartItem, updateCartItem } = useContext(CartProductContext);

  // Function to remove item from cart
  async function removeItem(id) {
    try {
      const response = await removeCartItem(id);
      console.log(response);
      setCartDetails(response.data);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  // Function to update item count in cart
  async function updateItemCount(id, count) {
    try {
      if (count < 1) {
        await removeItem(id);
      } else {
        const response = await updateCartItem(id, count);
        console.log(response);
        setCartDetails(response.data);
      }
    } catch (error) {
      console.error('Error updating item count:', error);
    }
  }

  // Function to fetch cart details on component mount
  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await getProductToCart();
        setCartDetails(response.data);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };
    fetchCartDetails();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-white">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 md:px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-2 md:px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.data.products.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-24 md:w-32 max-w-full h-auto rounded-lg object-cover"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-2 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-2 md:px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateItemCount(product.product.id, product.count - 1)}
                        className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-transform transform active:scale-90"
                        type="button"
                      >
                        <span className="sr-only">Decrease Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button
                        onClick={() => updateItemCount(product.product.id, product.count + 1)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 transition-transform transform active:scale-90"
                        type="button"
                      >
                        <span className="sr-only">Increase Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-2 md:px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price* product.count} EGP
                  </td>
                  <td className="px-2 md:px-6 py-4">
                    <span
                      onClick={() => removeItem(product.product.id)}
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline transition-colors duration-200"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center p-7">
            <Link to={`/payment`}>
              <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                Cashout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
