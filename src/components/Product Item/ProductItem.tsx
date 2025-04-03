'use client'
import React, { useEffect, useState } from 'react'
import './productitem.css';
import { useParams, useRouter } from 'next/navigation';
import { customerInterface, productInterface, useProducts } from '@/context/ProductContext';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { IoIosStar } from "react-icons/io";
import noImage from '../../../public/noimage.jpg';


const ProductItem = () => {

    const params = useParams();
    const router = useRouter();
    const [productData, setProductData] = useState<productInterface>();
    const [custReview, setCustReview] = useState<customerInterface[]>([]);
    const [multipleImg, setMultipleImg] = useState<string[]>([]);
    const [showImage, setShowImage] = useState<string>('');
    const { like, setLike, handleLike, handleUnLike, addToCart, cartItems } = useProducts();

    const id = params.productId;
    const fetchAllData = (): void => {
        const check = localStorage.getItem('alldata') || '';
        const allData = JSON.parse(check);
        const allProducts = allData.product;
        const data = allProducts.find((item: productInterface) => item._id === Number(id));
        setProductData(data);
        setMultipleImg(data.image);
        setCustReview(data.customer);
    }

    useEffect(() => {
        fetchAllData();
    }, [])

    const handleImage = (image: string): void => {
        setShowImage(image);
    }

    const handleLikeUnlike = (productId: number): void => {
        if (like[productId]) {
            handleUnLike(productId)
            setLike(prev => ({
                ...prev,
                [productId]: false
            }))
        } else {
            handleLike(productId);
            setLike(prev => ({
                ...prev,
                [productId]: true
            }))
        }
    }
    return (
        <>
            <div className="product-item">
                <Container>
                    <Row className='g-md-5 g-3'>
                        <Col lg={5} >
                            <Row className='g-0 p-0'>
                                <Col sm={2} xs={2}>
                                    <div className="multiple-img">

                                        {multipleImg.map((item, index) => {
                                            return (
                                                <div className={`img-item ${showImage === item ? 'active-img' : ''}`} key={index}>
                                                    <Image onMouseEnter={() => { handleImage(item) }} onClick={() => { handleImage(item) }} src={item} alt='multiple-img' width={500} height={500} priority />
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </Col>
                                <Col sm={10} xs={10}>
                                    <div className="single-img">
                                        <div className="like-item">

                                            {productData && <i onClick={(e) => {
                                                e.stopPropagation();
                                                handleLikeUnlike(productData._id);
                                            }} className={`bi bi-heart-fill ${like[productData._id] ? 'like' : 'unlike'}`} ></i>}
                                        </div>
                                        <Image src={showImage || multipleImg[0] || noImage} alt='multiple-img' width={5000} height={5000} />
                                    </div>
                                   
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={7}>
                            <div className="product-detail">
                                <div className="btn-cart">
                                    {
                                        productData &&
                                            !cartItems[productData._id] ?
                                            <Button className='add-to-cart' onClick={() => addToCart(productData._id)}><span><i className="bi bi-plus"></i></span><span>Add To Cart</span></Button>
                                            : <Button className='go-cart' onClick={() => router.push('/cart')}><span className='me-2'><i className="bi bi-cart-check"></i></span>Go To Cart</Button>
                                    }
                                </div>
                                <h5>{productData?.brand}</h5>
                                <h4>{productData?.title}</h4>
                                <div className="ratting">
                                    <h6>{productData?.ratting}<span><IoIosStar /></span></h6>
                                </div>
                                <div className="price d-flex flex-column gap-2">
                                    <label>Special Price</label>
                                    <h2>&#8377; {productData?.price}</h2>
                                </div>
                                <p>{productData?.desc}</p>
                            </div>
                            <div className="cust-review mt-3 ">
                                <h3 className='mb-4'>Customer Response</h3>

                                {
                                    custReview.map((item, index) => {
                                        return (
                                            <div key={index} className="customer-response">
                                                <h6>{item.customer_ratting}<span><IoIosStar /></span></h6>
                                                <p > {item.customer_review} </p>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ProductItem
