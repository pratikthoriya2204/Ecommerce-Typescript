'use client'
import { useProducts } from '@/context/ProductContext'
import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import './product.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Products = () => {
    const router = useRouter();
    const { cardData, setCardData } = useProducts();
    const { like, setLike,handleLike,handleUnLike,addToCart,cartItems } = useProducts();

    const getCardData = (): void => {
        const check = localStorage.getItem('alldata') || '';
        const alldata = JSON.parse(check);
        setCardData(alldata.product);
    }
    useEffect(() => {
        getCardData();
    }, [])

    const goToProduct = (id: number) => {
        router.push(`/${id}`);
    }

    const handleLikeUnlike = (productId: number) => {
        if (like[productId]) {
            handleUnLike(productId)
            setLike(prev => ({
                ...prev, [productId]: false
            }))
        }else{
            handleLike(productId);
            setLike(prev=> ({
                ...prev, [productId]:true
            }))
        }
    }
   
    return (
        <>
            <div className="product">
                <Container>
                    <Row className='g-3'>
                        {
                            cardData.length > 0 ?
                                cardData.map((item, index) => {
                                    return (
                                        <Col xs={6} xxl={3} xl={4} md={6} key={index} className='p-1' >
                                            <div className="product-card">
                                                <div className="card-image" onClick={() => goToProduct(item._id)}>
                                                    <Image src={item.image[0]} alt='cart-image' width={500} height={500} />
                                                </div>
                                                <div className="card-content" >
                                                    <div className="like-item">
                                                        {<i
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleLikeUnlike(item._id);
                                                            }} className={`bi bi-heart-fill ${like[item._id] ? 'like' : 'unlike'}`}>
                                                        </i>}
                                                    </div>
                                                    <div className="card-data">
                                                        <h4>{item.title}</h4>
                                                        <h5>&#8377;<span className='ms-1'>{item.price}</span></h5>
                                                    </div>
                                                    <h3>{item.brand}</h3>

                                                    <div className="card-bot">

                                                        <div className="ratting">
                                                            {
                                                                [...Array(Math.floor(item.ratting))].map((_, index) => {
                                                                    return (
                                                                        <i key={index} className="bi bi-star-fill green-star"></i>
                                                                    )
                                                                })

                                                            }
                                                            {
                                                                [...Array(5 - Math.floor(item.ratting))].map((_, index) => {
                                                                    return (
                                                                        <i key={index} className="bi bi-star"></i>
                                                                    )
                                                                })
                                                            }
                                                        </div>


                                                        <div className="cart">
                                                            {
                                                                !cartItems[item._id] ?
                                                                    <Button onClick={() => addToCart(item._id)} ><span><i className="bi bi-plus"></i></span><span>  Add To Cart</span></Button>
                                                                    : <Button onClick={()=> router.push('/cart')} className='gotocart'><span className=''><i className="bi bi-cart-check"></i></span><span>Go to cart</span></Button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                })
                                :
                                <><h3>No Data Found...</h3></>
                        }
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Products
