import React, { useContext, useEffect, useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
let {setUserLogin}= useContext(UserContext)

  let navigate = useNavigate();
  const [apiError, setapiEror] = useState("");
  const [isLoading, setisLoding] = useState(false);
  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "name minlenght is 3")
      .max(10, "name max length is 10")
      .required("name is required"),
    email: Yup.string().email("email invaild").required("enail is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Phone must be egyptaing number")
      .required("phone is required"),
  password:Yup.string().matches(/^[A-Z][a-z,0-9]{5,10}$/,"password must start with uppercase ...").required("passowrd is required"), //eroor
  rePassword: Yup.string().oneOf([Yup.ref('password')]).required("rePassowrd is required"),
      // password: Yup.string().matches(/^[A-Z][a-z]{5-10}$/,"password must start with uppercase ...").required("passowrd is required"),
      // password: Yup.string()
      // .oneOf([Yup.ref('password')], "rePassword must be the same password ")
      // .required("passowrd is required"),
  });

  async function handelRegister(formValues) {
    setisLoding(true);
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
      .then((apiResponse) => {
        if (apiResponse?.data?.message === "success") {
          localStorage.setItem('userToken', apiResponse.data.token)
          setUserLogin(apiResponse.data.token)
          navigate("/");
          setisLoding(false);
        }
       
      })
      .catch((apiResponse) => {
        setisLoding(false);

        setapiEror(apiResponse?.response?.data?.message);

        // console.log(apiResponse?.response?.data?.message);
      });

    // if (data === "succes") {
    //   navigate("/");
    // } else {
    //   //  eroooor
    // }

    // console.log(formValues);
  }

  let formick = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <div className="max-w-xl mx-auto py-5">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{apiError}</span>
          </div>
        ) : null}
        <form onSubmit={formick.handleSubmit}>
          <h2 className="text-3xl font-bold text-green-600 text-start mb-5">
            Register Now
          </h2>
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.name}
              type="name"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Name
            </label>
          </div>
          {formick.errors.name && formick.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.name}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your email
            </label>
          </div>
          {formick.errors.email && formick.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.email}</span>
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
              value={formick.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your password
            </label>
          </div>
          {formick.errors.password && formick.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.password}</span>
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.rePassword}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your rePassword
            </label>
          </div>
          {formick.errors.rePassword && formick.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.rePassword}</span>
            </div>
          ) : null}

          <button
            type="submit"
            className="text-white   bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
}
