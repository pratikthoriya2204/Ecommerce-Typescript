'use client'
import Cart from '@/components/Cart/Cart'
import { useProducts } from '@/context/ProductContext'
import React, { useEffect } from 'react'

const Page = () => {
  const { verifyLogin } = useProducts();

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <>
      <div className="home" style={{ backgroundColor: "#fff5f2",height:"100vh"}}>
        <Cart />
      </div>
    </>
  );
};

export default Page;