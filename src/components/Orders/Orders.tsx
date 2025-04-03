'use client'
import React, { useEffect, useState } from 'react'
import './orders.css';
import { productInterface, useProducts } from '@/context/ProductContext';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';

const Orders = () => {
  const [ordersData, setOrderData] = useState<productInterface[]>([]);
    const { like, setLike,handleLike,handleUnLike } = useProducts();
  const findOrders = (): void => {
    const check: string = localStorage.getItem('users') || '';
    const users = JSON.parse(check);
    setOrderData(users.orders || []);
  }

  useEffect(() => {
    findOrders();
  }, [])

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
      <div className="orders">
        <Container>
          <Row className='g-3 justify-content-md-start justify-center'>
            {
              ordersData.length > 0 ?
                ordersData.map((item, index) => {
                  return (
                    <Col xs={10} lg={3} md={6} key={index} >
                      <div className="product-card">
                        <div className="card-image" >
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
                            <h3>{item.brand}</h3>
                            <h3>Qty:- {item.quantity}</h3>
                            <h5>Total Price &#8377;<span className='ms-1'>{(item.quantity || 1) * item.price}</span></h5>
                          </div>
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

export default Orders
