import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

export default function Payment() {
  let { onlinePayment } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  let { cartId } = useParams();
  console.log(cartId);

  let formick = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => {
      payNow(values);
    },
  });

  async function payNow(values) {
    await onlinePayment(values);
  }
  // async function createCashOrder(address) {
  //     setLoading(true);
  //     try {
  //         let response = await axios.post(
  //             `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
  //             {
  //                 shippingAddress: address
  //             }, {
  //             params: {
  //                 url: window.location.origin
  //             },
  //             headers: {
  //                 token: localStorage.getItem("userToken")
  //             }
  //         }
  //         );
  //         let { data } = response;
  //         console.log(data.session.url);
  //         window.open(data.session.url, '_self');
  //     } catch (err) {
  //         console.error("Error placing order:", err);
  //     } finally {
  //         setLoading(false);
  //     }
  // }
  return (
    <React.Fragment>
      <div className="container flex justify-center flex-wrap mx-auto my-12 pt-6">
        <form onSubmit={formick.handleSubmit}>
          <h2 className="text-3xl font-bold text-green-600 text-start mb-5">
            Payment
          </h2>
          <div className="relative  z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.details}
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your details
            </label>
          </div>
          {formick.errors.details && formick.touched.details ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.details}</span>
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your phone
            </label>
          </div>
          {formick.errors.phone && formick.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.phone}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.city}
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your city
            </label>
          </div>
          {formick.errors.city && formick.touched.city ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.city}</span>
            </div>
          ) : null}

          <div className="flex items-center">
            <button
              type="submit"
              className="text-white   bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Paynow
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
