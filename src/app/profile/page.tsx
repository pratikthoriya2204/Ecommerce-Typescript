'use client'
import Footer from '@/components/Footer/Footer';
import Profile from '@/components/Profile page/Profile'
import { useProducts } from '@/context/ProductContext';
import React, { useEffect } from 'react'

const Page = () => {
  const { verifyLogin } = useProducts();

  useEffect(() => {
    verifyLogin();
  }, []);

  return (
    <>
      <Profile />
      <Footer />
    </>
  )
}

export default Page
