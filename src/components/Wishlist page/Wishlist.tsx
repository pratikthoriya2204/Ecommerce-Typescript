'use client'
import React, { useEffect, useState } from 'react'
import './wishlist.css';
import { productInterface, useProducts } from '@/context/ProductContext';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Wishlist = () => {
    const router = useRouter();
    const [likedProduct, setLikedproduct] = useState<productInterface[]>([]);
    const { like, setLike, handleLike, handleUnLike } = useProducts();
    const findLikedProducts = (): void => {
        const check = localStorage.getItem('users') || '';
        const user = JSON.parse(check);
        const likeId: number[] = user.likeId || [];
        const check2 = localStorage.getItem('alldata') || '';
        const allData = JSON.parse(check2);
        const product: productInterface[] = allData.product || [];

        const likedProducts = product.filter(item => likeId.includes(item._id)) || [];
        setLikedproduct(likedProducts);
    }

    const goToProduct = (id: number) => {
        router.push(`/${id}`);
    }

    const handleLikeUnlike = (productId: number) => {
        if (like[productId]) {
            handleUnLike(productId)
            setLike(prev => ({
                ...prev, [productId]: false
            }))
        } else {
            handleLike(productId);
            setLike(prev => ({
                ...prev, [productId]: true
            }))
        }
    }
    useEffect(() => {
        findLikedProducts();
    }, [like])
    return (
        <>
            <div className="product">
                <Container>
                    <Row className='g-3 justify-content-md-start justify-center'>
                        {
                            likedProduct.length > 0 ?
                                likedProduct?.map((item, index) => {
                                    return (
                                        <Col xs={11} xxl={3} xl={4} md={6} key={index} >
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
                                                                [...Array(Math.floor(item.ratting))].map((_, index:number) => {
                                                                    return (
                                                                        <i key={index} className="bi bi-star-fill green-star"></i>
                                                                    )
                                                                })

                                                            }
                                                            {
                                                                [...Array(5 - Math.floor(item.ratting))].map((_, index:number) => {
                                                                    return (
                                                                        <i key={index} className="bi bi-star"></i>
                                                                    )
                                                                })
                                                            }
                                                        </div>


                                                        <div className="cart">
                                                            {/* {
                                                                !cartItems[item._id] ?
                                                                    <Button onClick={() => addToCart(item._id)} ><span><i className="bi bi-plus"></i></span><span>  Add To Cart</span></Button>
                                                                    : <Button onClick={goToCart} className='gotocart'><span className='me-2'><i className="bi bi-cart-check"></i></span><span>Go to cart</span></Button>
                                                            } */}
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

export default Wishlist
