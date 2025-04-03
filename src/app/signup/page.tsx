'use client'
import Signup from '@/components/Signup/Signup'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Page = () => {
  const router = useRouter();
  const token = localStorage.getItem('token');
   
  useEffect(()=>{
    if(token){
      router.push('/');
    }
  },[])
    return (
      <>
        <Signup />
      </>
    )
  }

export default Page
