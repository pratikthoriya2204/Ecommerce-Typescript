'use client'
import Login from '@/components/Login/Login'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/')
    }
  }, [])

  return (
    <>
      <Login />
    </>
  )
}

export default Page
