'use client'
import Orders from '@/components/Orders/Orders'
import { useProducts } from '@/context/ProductContext'
import React, { useEffect } from 'react'

const Page = () => {
  const { verifyLogin } = useProducts();

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <>
      <div className="home" style={{ backgroundColor: "#fff5f2", height: "100vh" }}>
        <Orders />
      </div>
    </>
  )
}

export default Page
