'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import './login.css';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';

interface loginInterface {
  email: string,
  password: string
}
interface Errors {
  [key: string]: string
}
const Login = () => {
  const router = useRouter();
  const [logindata, setLoginData] = useState<loginInterface>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginData(prev => ({ ...prev, [name]: value }))
  }

  const validation = (data: loginInterface): Errors => {
    const errors: Errors = {};

    if (!data.email.trim()) {
      errors.email = 'Name Is Required...'
    }
    if (!data.password.trim()) {
      errors.password = 'Password Is Required...'
    }
    return errors;
  }
  const generateToken = (): string => {
    return Math.random().toString(36).substr(2);
  }
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = validation(logindata);
    setError(newError);
    if (Object.keys(newError).length === 0) {
      const user = localStorage.getItem('users') || '';
      const users = JSON.parse(user);
      if (users.email === logindata.email && users.password === logindata.password) {
        const token: string = generateToken();
        localStorage.setItem('token', token);
        router.push('/');
      } else {
        toast.error('username or password does not match')
      }
    } else {
      toast.error('please enter username or password..')
    }
  }
  return (
    <>
      <div className="login">
        <div className="signup-img">
          <Image src={'/auth.png'} alt='auth-img' width={500} height={500} />
        </div>
        <div className="form">
          <div className="form-heading">
            <Image src={'/logo1.png'} className='form-heading-img' alt='auth-img' width={500} height={500} />
            <h3 className=''>Login</h3>
            <p>Enter your details bellow</p>
          </div>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Enter Username" name='email' value={logindata.email} onChange={handleChange} autoComplete='username' />
              {
                error.email && (

                  <Form.Text className="err-msg ms-3">
                    {error.email}
                  </Form.Text>
                )
              }
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Enter Password" name='password' value={logindata.password} onChange={handleChange} autoComplete='new-password' />
              {
                error.password && (

                  <Form.Text className="err-msg ms-3">
                    {error.password}
                  </Form.Text>
                )
              }
            </Form.Group>
            <Button className='login-btn' variant="primary" type="submit">
              Login
            </Button>
          </Form>

          <div className="message">
            <p>Dont Have an Account Please <Link href={'/signup'}>Sign Up</Link></p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
