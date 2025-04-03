'use client'
import React, { useEffect, useState } from 'react'
import './corousal.css';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';

const Corousal = () => {

    const [advertise, setAdvertise] = useState<string[]>([]);

    useEffect(()=>{
        const dataCheck = localStorage.getItem('alldata') || "";
        const alldata = JSON.parse(dataCheck);
        const addvertise:string[] = alldata.advertise.advertise_image;
        setAdvertise(addvertise);
    },[])

    return (
        <>
            <div className="carosal">

                <Carousel>
                    {advertise.map((add, idx) => {
                        return (
                            <Carousel.Item key={idx}>
                                <Image src={add} alt='carosal-img1' width={5000} height={5000} className='carosal-img d-block w-100' priority />
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
        </>
    )
}

export default Corousal
