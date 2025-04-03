'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Accordion, Button, Container, Form, Offcanvas } from 'react-bootstrap'
import './filter.css';
import { productInterface, useProducts } from '@/context/ProductContext';

interface FilterProps {
    show: boolean;
    handleShow: () => void;
    handleClose: () => void;
    category: string[];
    setCategory: (data: string[] | ((prev: string[]) => string[])) => void;
    brand: string[];
    setBrand: (data: string[] | ((prev: string[]) => string[])) => void;
    handleFilter: () => void;
    highToLow: (item: productInterface[]) => void;
    LowToHigh: (item: productInterface[]) => void;
}
const Filter: React.FC<FilterProps> = ({ show, handleClose, handleShow, category, setCategory, brand, setBrand, handleFilter, highToLow, LowToHigh }) => {

    const { setCardData } = useProducts();
    const [sorting, setsorting] = useState<string>('');
    const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategory([...category, value])
        } else {
            setCategory(category.filter(item => item !== value));
        }
    }

    const handleBrandChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setBrand([...brand, value])
        } else {
            setBrand(brand.filter(item => item !== value));
        }
    }

    const handleClearFilter = () => {
        const checkBoxValue: string[] = [...category, ...brand];
        const checkBox = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
        checkBox.forEach((check) => {
            if (checkBoxValue.includes(check.value)) {
                check.checked = false;
            }
        })
        const check = localStorage.getItem('alldata') || '';
        const allData = JSON.parse(check);
        setCardData(allData.product);
        setCategory([])
        setBrand([]);
    }

    useEffect(() => {
        if (sorting === 'lowtohigh') {
            const check = localStorage.getItem('alldata') || '';
            const alldata = JSON.parse(check)
            LowToHigh(alldata.product);
        } else if (sorting === 'hightolow') {
            const check = localStorage.getItem('alldata') || '';
            const alldata = JSON.parse(check)
            highToLow(alldata.product);
        }
    }, [sorting])

    return (
        <>
            <Container>
                <div className="filter">
                    <div className="sortby">
                        <select className="form-select" name='sorting' value={sorting} onChange={(e) => { setsorting(e.target.value) }} aria-label="Default select example">
                            <option defaultValue="true">Sort By</option>
                            <option value="lowtohigh" className='text-[14px]'>Low to High</option>
                            <option value="hightolow" className='text-[14px]'>High to Low</option>
                        </select>

                    </div>
                    <div className="filter-item">
                        <Button variant="primary" onClick={handleShow}>
                            <i className="bi bi-funnel-fill"></i>
                        </Button>

                        <Offcanvas show={show} placement={'end'} name="end" onHide={handleClose}>
                            <Offcanvas.Header closeButton className='offcan-head'>
                                <Offcanvas.Title>Filters
                                </Offcanvas.Title>
                                <Button className='filter-btn' onClick={handleFilter}>Filter</Button>
                                <Button className='clear-btn' onClick={handleClearFilter}>Clear</Button>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="filter-body">
                                    <Accordion defaultActiveKey={['0', '1', '2']} flush>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Category

                                            </Accordion.Header>

                                            <Accordion.Body>
                                                <Form>
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Electric'
                                                        value='electric'
                                                        onChange={handleCategoryChange}
                                                        checked={category.includes('electric')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Sports'
                                                        value='sports'
                                                        onChange={handleCategoryChange}
                                                        checked={category.includes('sports')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Cloth'
                                                        value='cloth'
                                                        onChange={handleCategoryChange}
                                                        checked={category.includes('cloth')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Shoes'
                                                        value='shoes'
                                                        onChange={handleCategoryChange}
                                                        checked={category.includes('shoes')}
                                                    />
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Brand</Accordion.Header>
                                            <Accordion.Body>
                                                <Form>

                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Motorola'
                                                        value='motorola'
                                                        onChange={handleBrandChange}
                                                        checked={brand.includes('motorola')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Noise'
                                                        value='noise'
                                                        onChange={handleBrandChange}
                                                        checked={brand.includes('noise')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Hp'
                                                        value='hp'
                                                        onChange={handleBrandChange}
                                                        checked={brand.includes('hp')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Apple'
                                                        value='apple'
                                                        onChange={handleBrandChange}
                                                        checked={brand.includes('apple')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Nike'
                                                        value='nike'
                                                        onChange={handleBrandChange}
                                                        checked={brand.includes('nike')}
                                                    />
                                                    <Form.Check // prettier-ignore
                                                        type='checkbox'
                                                        id='checkbox'
                                                        label='Adidas'
                                                        value='adidas'
                                                        onChange={handleBrandChange}
                                                        checked={brand.includes('adidas')}
                                                    />
                                                </Form>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Filter
