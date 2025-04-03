'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import './navbar.css';
import { Container, Offcanvas } from 'react-bootstrap';
import Image from 'next/image';
import { RiAccountCircleLine } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
// import { HiMenuAlt2 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import { HiMenuAlt2 } from 'react-icons/hi';
import { data } from '../../../public/data.js';
import { useProducts } from '@/context/ProductContext';



const Navbar = () => {
    const router = useRouter();
    const [show, setShow] = useState<boolean>(false);
    const [length, setLength] = useState<number>(0);
    const { cartData } = useProducts();
    const [searchData, setSearchData] = useState<string>('');
    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value);
    }
    useEffect(() => {
        localStorage.setItem('alldata', JSON.stringify(data));
    }, [])
    const goToHome = () => {
        router.push('/')
    }

    const goToProfile = (): void => {
        router.push('/profile')
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }
    useEffect(() => {
        setLength(cartData.length)
    }, [cartData])

    const handleSearch = () => {
        router.push(`/search/${searchData}`)
    }
    return (
        <>
            <div className="navbar">
                <Container>
                    <div className="nav-item">
                        <Image onClick={goToHome} src='/logo1.png' alt='logo' width={500} height={500} className='logo' priority />
                        <div className="search">
                            <CiSearch className='icon' />
                            <input type="text" name='search' value={searchData} onChange={handleChange} placeholder='Search...' />
                            <div className="search-btn" onClick={handleSearch}>
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </div>
                        <div className="nav-right">
                            <p onClick={goToProfile}>
                                <span> <RiAccountCircleLine /></span>
                                Account
                            </p>
                            <p className='cart-p' onClick={() => router.push('/cart')} >
                                <span><FaShoppingCart /></span>
                                <label>Cart</label>
                                {cartData.length > 0 &&
                                    <label className='cart-badge'>{length}</label>
                                }
                            </p>
                            <p onClick={handleLogout}>
                                <span><MdLogout /></span>
                                Logout
                            </p>
                        </div>
                        <input type="checkbox" id='check' />
                        <label htmlFor="check" className='check-label' onClick={handleShow} >
                            <span><HiMenuAlt2 /></span>
                        </label>


                    </div>
                    <Offcanvas show={show} placement={'end'} name="end" onHide={handleClose} responsive="lg"  >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Responsive offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="nav-mobile">
                                <p onClick={goToProfile}>
                                    <span> <RiAccountCircleLine /></span>
                                    Account
                                </p>
                                <p className='cart-p' onClick={() => router.push('/cart')} >
                                    <span><FaShoppingCart /></span>
                                    Cart
                                    {cartData.length > 0 &&
                                        <label className='cart-badge'>{length}</label>
                                    }
                                </p>
                                <p onClick={handleLogout}>
                                    <span><MdLogout /></span>
                                    Logout
                                </p>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
            </div>
        </>
    )
}

export default Navbar
