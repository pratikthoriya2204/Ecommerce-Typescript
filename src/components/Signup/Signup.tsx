'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import './signup.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import { toast } from 'react-toastify';

export interface signupTypeInterface {
    name: string,
    number: string,
    email: string,
    address: string,
    dob: string,
    city: string,
    password: string,
    cpassword: string
}
interface Errors {
    [key: string]: string
}
const Signup = () => {

    const router = useRouter();

    const [data, setData] = useState<signupTypeInterface>({
        name: '',
        number: '',
        email: '',
        address: '',
        dob: '',
        city: '',
        password: '',
        cpassword: ''
    });
    const [error, setError] = useState<Errors>({});

    const handleChange = (e: ChangeEvent<HTMLElement>): void => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setData(prev => ({ ...prev, [name]: value }));
    }


    const validation = (data: signupTypeInterface): Errors => {

        const errors: Errors = {};

        if (!data.name.trim()) {
            errors.name = 'Name Is Required...'
        }
        if (!data.number.trim()) {
            errors.number = 'Phone no. Is Required...'
        } else if (data.number.length !== 10) {
            errors.number = 'Phone no. Invalid...'
        }
        if (!data.email.trim()) {
            errors.email = 'Email Is Required...'
        }
        if (!data.address.trim()) {
            errors.address = 'Address Is Required...'
        }
        if (!data.dob.trim()) {
            errors.dob = 'Dob Is Required...'
        }
        if (!data.city.trim()) {
            errors.city = 'City Is Required...'
        }
        if (!data.password.trim()) {
            errors.password = 'Password Is Required...'
        }
        if (!data.cpassword.trim()) {
            errors.cpassword = 'Confirm Password Is Required...'
        } else if (data.password !== data.cpassword) {
            errors.cpassword = 'Password Doed Not Matched'
        }

        return errors;
    }



    const generateIndex = (): number => {
        const val: number = Math.floor(Math.random() * 10)
        return val;
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const newError = validation(data);
        setError(newError);
        if (Object.keys(newError).length === 0) {

            const { name, number, email, address, dob, city, password } = data;
            const index: number = generateIndex();
            const newUser = {
                id: index,
                name: name,
                number: number,
                email: email,
                address: address,
                dob: dob,
                city: city,
                password: password,
            }
            localStorage.setItem('users', JSON.stringify(newUser));
            setData({
                name: '',
                number: '',
                email: '',
                address: '',
                dob: '',
                city: '',
                password: '',
                cpassword: ''
            });
            router.push('/login');
        }
        else {
            toast.error('Please Fill the Form...')
        }
    }
    return (
        <>
            <div className="signup">
                <div className="signup-img">
                    <Image src={'/auth.png'} alt='auth-img' width={500} height={500} />
                </div>
                <div className="form">
                    <div className="form-heading">
                        <Image src={'/logo1.png'} className='form-heading-img' alt='auth-img' width={500} height={500} />
                        <h3 className=''>Create an Account</h3>
                        <p>Enter your details bellow</p>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="Enter Name" name='name' value={data.name} onChange={handleChange} />
                            {
                                error.name && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.name}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="number" placeholder="Enter Mobile No." name='number' value={data.number} onChange={handleChange} />
                            {
                                error.number && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.number}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="Enter Email" name='email' value={data.email} onChange={handleChange} autoComplete='username' />
                            {
                                error.email && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.email}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type='text' placeholder="Enter Address" name='address' value={data.address} onChange={handleChange} />

                            {
                                error.address && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.address}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Control type="date" name='dob' placeholder='Enter DOB' value={data.dob} onChange={handleChange} />
                            {
                                error.dob && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.dob}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" name='city' value={data.city} onChange={handleChange} >
                                <option value="">Select City</option>
                                <option value="Rajkot">Rajkot</option>
                                <option value="Ahmedabad">Ahmedabad</option>
                                <option value="Surat">Surat</option>
                                <option value="Bhavnagar">Bhavnagar</option>
                            </Form.Select>
                            {
                                error.city && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.city}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Enter Password" name='password' value={data.password} onChange={handleChange} autoComplete='new-password' />
                            {
                                error.password && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.password}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="Enter Confirm Password" name='cpassword' value={data.cpassword} onChange={handleChange} autoComplete='new-password' />
                            {
                                error.cpassword && (

                                    <Form.Text className="err-msg ms-3">
                                        {error.cpassword}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>

                        <Button className='signup-btn' variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <div className="message">
                        <p>Allready have an Account Please <Link href={'/login'}>Login</Link></p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Signup
