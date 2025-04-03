'use client'
import { productInterface, useProducts } from '@/context/ProductContext'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './search.css';

const Page = () => {
  const router = useRouter();
  const { like, setLike, handleLike, handleUnLike } = useProducts();
  const params = useParams();
  const [searchProduct, setSearchProduct] = useState<productInterface[]>([]);
  const searchValue = String(params.search).toLowerCase();
  const findSearchData = () => {
    const check: string = localStorage.getItem('alldata') || '';
    const alldata = JSON.parse(check);
    const product: productInterface[] = alldata.product;

    const getData: productInterface[] = product.filter(item => item.brand === searchValue);
    setSearchProduct(getData);
  }

  useEffect(() => {
    findSearchData();
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
    } else {
      handleLike(productId);
      setLike(prev => ({
        ...prev, [productId]: true
      }))
    }
  }

  return (
    <>
      <div className="home" style={{ backgroundColor: "#fff5f2", height: "100vh" }}>

        <div className="product">
          <Container>
            <Row className='g-3'>
              {
                searchProduct.length > 0 ?
                  searchProduct.map((item, index) => {
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
      </div>

    </>
  )
}

export default Page
