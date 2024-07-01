import React, { useEffect, useState } from 'react';
import Style from './ProtactedRoute.module.css';
import { Navigate } from 'react-router-dom';


export default function ProtactedRoute(props) {


  if (localStorage.getItem('userToken') !== null) {
    //navigate to componanet
    return props.children
  }
  else {
    // navigate login
   return <Navigate to={"/login"} />
  }
}
