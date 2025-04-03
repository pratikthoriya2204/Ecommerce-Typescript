'use client'
import React from 'react'
import './cart.css';
import { cartItemType, productInterface, useProducts } from '@/context/ProductContext';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
    const router = useRouter();
    const { cartData, setCartData, cartItems, setCartItems } = useProducts();

    const goToProduct = (id: number) => {
        router.push(`/${id}`);
    }

    const addQty = (itemId: number) => {
        const check: string = localStorage.getItem('users') || '';
        const users = JSON.parse(check);
        const cart: productInterface[] = users.cart;
        const findCart = cart.find(item => item._id === itemId);
        const quantity = (findCart?.quantity || 1) + 1
        let finalCartdata = [...cart];
        if (findCart) {
            finalCartdata = finalCartdata.map(item =>
                item._id === itemId ? { ...item, quantity } : item
            );
        }
        const finalData = { ...users, cart: finalCartdata }
        localStorage.setItem('users', JSON.stringify(finalData));
        setCartData(finalData.cart);
    }

    const removeCartIds = (obj: cartItemType, id: number) => {
        if (obj.hasOwnProperty(id)) {
            delete obj[id]
            return true
        } else {
            return false
        }
    }
    const minusQty = (itemId: number) => {
        const check: string = localStorage.getItem('users') || '';
        const users = JSON.parse(check);
        const cart: productInterface[] = users.cart;
        const findCart = cart.find(item => item._id === itemId);
        const quantity = (findCart?.quantity || 1) - 1;
        let finalCartData = [...cart]
        if (quantity === 0) {
            Swal.fire({
                icon: "warning",
                title: "warning",
                text: "Are you sure want to removed from cart?",
            }).then((result) => {
                if (result.isConfirmed) {
                    const deleteCart = cartData.filter(item => item._id !== itemId);
                    setCartData(deleteCart);
                    const removeProduct = { ...users, cart: deleteCart };
                    removeCartIds(cartItems, itemId);
                    localStorage.setItem('users', JSON.stringify(removeProduct));
                }
            });
            return false;
        } else {
            if (findCart) {
                finalCartData = cart.map(item =>
                    item._id === itemId ? { ...item, quantity } : item
                );
            }
            const finalData = { ...users, cart: finalCartData };
            localStorage.setItem('users', JSON.stringify(finalData));
            setCartData(finalData.cart);
        }
    }

    const buyNow = (item: productInterface) => {
        const check: string = localStorage.getItem('users') || '';
        const users = JSON.parse(check);
        const cart: productInterface[] = users.cart;

        Swal.fire({
            icon: "question",
            // title: "Success",
            text: "Order confirm ?",
            showCancelButton: true,
            confirmButtonText: 'order',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const orders = [...(users.orders || []), item];
                const data = cart.filter(data => data._id !== item._id);
                setCartData(data);
                const emaptyCart = { ...users, cart: data, orders };
                localStorage.setItem('users', JSON.stringify(emaptyCart));
                removeCartIds(cartItems, item._id);
                toast.success('order success')
            } else {
                toast.error('order cancled...')
            }
        })
    }

    const placeOrder = () => {
        const check: string = localStorage.getItem('users') || '';
        const users = JSON.parse(check);
        const cart: productInterface[] = users.cart;

        Swal.fire({
            icon: "question",
            // title: "Success",
            text: "Order confirm ?",
            showCancelButton: true,
            confirmButtonText: 'order',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                const orders = [...(users.orders || []), ...cart];
                const emptyCart = { ...users, cart: [], orders };
                localStorage.setItem('users', JSON.stringify(emptyCart));
                setCartData([])
                setCartItems({})
                toast.success('order Success...')
                router.push('/');
            } else {
                toast.error('order cancled...')
            }
        })
    }
    return (
        <>
            <div className="cart-page">
                <Container>
                    <div className="cart-page-head d-none d-md-block">
                        <Row className=''>
                            <Col md={2}>
                                <h3>Product</h3>
                            </Col>
                            <Col md={4}>

                            </Col>
                            <Col md={2} >
                                <h3>Quantity</h3>
                            </Col>
                            <Col md={2}>
                                <h3>Price</h3>
                            </Col>
                            <Col md={2}>
                                <h3>Total</h3>
                            </Col>
                        </Row>
                    </div>
                    <div className="cart-items d-none d-md-block">
                        {
                            cartData.length > 0 ?
                                cartData.map((item, index) => {
                                    return (
                                        <Row key={index} className='mt-4 cart-box'>
                                            <Col md={2} onClick={() => { goToProduct(item._id) }} style={{ cursor: "pointer" }}>
                                                <div className="cart-img">
                                                    <Image src={item.image[0]} alt='cart-img' width={500} height={500} />
                                                </div>
                                            </Col>
                                            <Col md={4} onClick={() => { goToProduct(item._id) }} style={{ cursor: "pointer" }} >
                                                <div className="cart-info">
                                                    <h4>{item.brand}</h4>
                                                    <h3>{item.title}</h3>
                                                    <h6>{item.category}</h6>
                                                    <h5>{item.ratting} <span><i className="bi bi-star-fill"></i></span></h5>
                                                </div>
                                            </Col>
                                            <Col md={2} className='p-0'>
                                                <div className="qty">
                                                    <Button onClick={() => minusQty(item._id)}><i className="bi bi-dash-lg"></i></Button>
                                                    <p>{item.quantity}</p>
                                                    <Button onClick={() => addQty(item._id)}><i className="bi bi-plus-lg"></i></Button>
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <h3 className='cart-price'>&#8377; {item.price}</h3>
                                            </Col>
                                            <Col md={2}>
                                                <h3 className='cart-price'>&#8377; {item.price * (item.quantity || 1)}</h3>
                                            </Col>
                                            <Button onClick={() => buyNow(item)} className='cart-btn'><i className="bi bi-bag-fill"></i></Button>
                                        </Row>
                                    )
                                })
                                : <><h4>Cart is Empty</h4></>
                        }

                    </div>
                    <div className="d-md-none d-block">
                        {
                            cartData.length > 0 ?
                                cartData.map((item, index) => {
                                    return (
                                        <div key={index} className='mt-4 cart-box'>
                                            <div className="cart-left">
                                                <div className="cart-img">
                                                    <Image src={item.image[0]} alt='cart-img' width={500} height={500} />
                                                </div>
                                                <div className="qty">
                                                    <Button onClick={() => minusQty(item._id)}><i className="bi bi-dash-lg"></i></Button>
                                                    <p>{item.quantity}</p>
                                                    <Button onClick={() => addQty(item._id)}><i className="bi bi-plus-lg"></i></Button>
                                                </div>
                                            </div>
                                            <div className="cart-right">
                                                <div className="cart-info">
                                                    <h4>{item.brand}</h4>
                                                    <h3>{item.title}</h3>
                                                    <div className="cart-right-bot">
                                                        <h6>{item.category}</h6>
                                                        <h5>{item.ratting} <span><i className="bi bi-star-fill"></i></span></h5>
                                                    </div>
                                                </div>
                                                <div className="price-section">
                                                    <h3 className='cart-price' style={{color:"#ed6f49"}}>&#8377; {item.price}</h3>
                                                    <h3 className='cart-price'>Total:- &#8377; {item.price * (item.quantity || 1)}</h3>
                                                </div>
                                            </div>



                                            <Button onClick={() => buyNow(item)} className='cart-btn'><i className="bi bi-bag-fill"></i></Button>
                                        </div>
                                    )
                                })
                                : <><h4>Cart is Empty</h4></>
                        }

                    </div>
                    {
                        cartData.length > 0 ?

                            <div className="order">
                                <Button onClick={placeOrder}>Order Now</Button>
                                <ToastContainer />
                            </div>
                            : <></>
                    }
                </Container>
            </div>
        </>
    )
}

export default Cart
