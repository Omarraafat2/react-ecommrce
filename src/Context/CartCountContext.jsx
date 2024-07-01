import React, { createContext, useState } from 'react'

export let CartCountContext = createContext();
export default function CartCountProvider() {


    const [cartCount, setCartCount] = useState(0);
  return (
    <CartCountContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartCountContext.Provider>
  )
}
