'use client'
import React, { useEffect, useState } from 'react'
import { signupTypeInterface } from '../Signup/Signup'
import { Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import Image from 'next/image';
import { ImFolderUpload } from "react-icons/im";
import { FaAngleRight } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import './profile.css';
import { RiMenu2Fill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';

const Profile = () => {
    const router = useRouter();
    const [profiledata, setProfileData] = useState<signupTypeInterface>();
    const [show, setShow] = useState<boolean>(false);
    const { getLocalStorageData } = useProducts();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getProfileData = (): void => {
        const users = getLocalStorageData("users", {} as signupTypeInterface);
        setProfileData(users);
    }
    useEffect(() => {
        getProfileData();
    }, [])

    const goToWishlist = (): void => {
        router.push('/wishlist')
    }
    return (
        <>
            <div className="profile">
                <Container>
                    <Row>
                        <Col lg={3} md={0}>
                            <div className="profile-left profile-sidebar">
                                <div className="profile-header">
                                    <Image src='/profile2.png' alt='profile-image' width={500} height={500} />
                                    <h3>Hello {profiledata?.name}</h3>
                                </div>
                                <div className="profile-left-content">
                                    <div className="profile-left-content-head border-bottom" onClick={() => router.push('/orders')}>
                                        <p><span><ImFolderUpload /></span>MY ORDERS</p>
                                        <FaAngleRight />
                                    </div>
                                    <div className="profile-left-content-head">
                                        <p><span><FaUser /></span>ACCOUNT SETTINGS</p>
                                    </div>
                                    <div className="profile-left-list border-bottom">
                                        <li>Profile Information</li>
                                    </div>
                                    <div className="profile-left-content-head">
                                        <p><span><FaHouseChimneyUser /></span>MY STUFF</p>
                                    </div>
                                    <div className="profile-left-list border-bottom" onClick={goToWishlist} >
                                        <li>My Wishlist</li>
                                    </div>

                                    <div className="profile-left-content-head border-bottom">
                                        <p ><span><AiOutlineLogout /></span>LOGOUT</p>
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col lg={9} md={12} >
                            <div className="profile-right">
                                <Row className='profile-right-row'>
                                    <Button className='open-list' variant="primary" onClick={handleShow}>
                                        <RiMenu2Fill />
                                    </Button>
                                    <div className="heading">

                                        <h3>Personal Information</h3>
                                    </div>
                                    <Col>
                                        <div className="profile-right-info">
                                            <label>Your Name</label>
                                            <p>{profiledata?.name}</p>
                                            <label>Date Of Birth</label>
                                            <p>{profiledata?.dob}</p>
                                        </div>
                                        <div className="profile-right-info mt-3">
                                            <label>Mobile Number</label>
                                            <p>{profiledata?.number}</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="profile-right-info">
                                            <label>Email Addres</label>
                                            <p>{profiledata?.email}</p>
                                        </div>

                                        <div className="profile-right-info mt-3">
                                            <label>City</label>
                                            <p>{profiledata?.city}</p>
                                        </div>
                                        <div className="profile-right-info mt-3">
                                            <label>Address</label>
                                            <p>{profiledata?.address}</p>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="profile-bottom">
                                    <h4>FAQs</h4>
                                    <h5>What happens when I update my email address (or mobile number)?</h5>
                                    <p>Your login email id (or mobile number) changes, likewise. Youll receive all your account related communication on your updated email address (or mobile number).</p>
                                    <h5>What happens to my existing Flipkart account when I update my email address (or mobile number)?</h5>
                                    <p>Updating your email address (or mobile number) doesnt invalidate your account. Your account remains fully functional. Youll continue seeing your Order history, saved information and personal details.</p>
                                </div>

                            </div>
                        </Col>
                    </Row>

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="profile-sidebar">
                                <div className="profile-header">
                                    <Image src='/profile2.png' alt='profile-image' width={500} height={500} />
                                    <h3>Hello {profiledata?.name}</h3>
                                </div>
                                <div className="profile-left-content">
                                    <div className="profile-left-content-head border-bottom"onClick={() => router.push('/orders')} >
                                        <p><span><ImFolderUpload /></span>MY ORDERS</p>
                                        <FaAngleRight />
                                    </div>
                                    <div className="profile-left-content-head">
                                        <p><span><FaUser /></span>ACCOUNT SETTINGS</p>
                                    </div>
                                    <div className="profile-left-list border-bottom">
                                        <li>Profile Information</li>
                                    </div>
                                    <div className="profile-left-content-head">
                                        <p><span><FaHouseChimneyUser /></span>MY STUFF</p>
                                    </div>
                                    <div className="profile-left-list border-bottom" onClick={goToWishlist} >
                                        <li>My Wishlist</li>
                                    </div>

                                    <div className="profile-left-content-head border-bottom">
                                        <p ><span><AiOutlineLogout /></span>LOGOUT</p>
                                    </div>
                                </div>
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
            </div>
        </>
    )
}

export default Profile
