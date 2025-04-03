import React from 'react'
import './footer.css';
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
        <div className="footer">
                <Row className='justify-content-center align-items-center g-3'>
                    <Col lg={3} sm={6}>
                        <div className="footer-logo">
                            <Image src='/logo1.png' alt='footer-logo' width={1000} height={1000} priority />
                        </div>
                        <p>Online Shipping Private Limited is an Indian e-commerce company, headquartered in Bangalore, and incorporated in Singapore as a private limited company.</p>
                        <div className="footer-icon">
                            <i className="bi bi-facebook"></i>
                            <i className="bi bi-instagram"></i>
                            <i className="bi bi-twitter"></i>
                            <i className="bi bi-discord"></i>
                        </div>
                    </Col>
                    <Col lg={2} sm={6}>
                        <h3 className='footer-head'>
                            Quick Links
                        </h3>
                        <div className="footer-link">
                        <Link href="/">Home</Link>
                            <a href="">About</a>
                            <Link href="/profile">Profile</Link>
                            <a href="">Cart</a>
                            <Link href="/wishlist">Wishlist</Link>
                        </div>
                    </Col>
                    <Col lg={2} sm={6}>
                        <h3 className='footer-head'>
                            Help
                        </h3>
                        <div className="footer-link">
                            <a href="">Payments</a>
                            <a href="">Shipping</a>
                            <a href="">Canclation & returns</a>
                            <a href="">Faq</a>
                            <a href="">Become a Seller</a>
                        </div>
                    </Col>
                    <Col lg={2} sm={6}>
                        <h3 className='footer-head'>
                            Consumer Policy
                        </h3>
                        <div className="footer-link">
                            <a href="">Canclation & returns</a>
                            <a href="">Terms & Use</a>
                            <a href="">Security</a>
                            <a href="">Privacy</a>
                            <a href="">Sitemap</a>
                        </div>
                    </Col>
                </Row>
            </div>
    </>
  )
}

export default Footer
