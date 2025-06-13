import axios from 'axios';
import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function FormLogin() {

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formHandler = (e) => {
     setUser({
         ...user,
         [e.target.name] : e.target.value
     })
  }

  const formSubmitHandler = () => {
    axios.post('http://localhost:3001/api/author/login', user)
        .then(response => {
          console.log('Login OK', response.data);
          localStorage.setItem('token', response.data)
          navigate('/')
        })
        .catch(error => setError(error.response.data)) 
 }

  return (
    <Form className='my-5'>
      <Form.Group className="mb-3" controlId="username">
        <Form.Control type="text" name="username" placeholder="Enter username" onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Control type="password" name="password" placeholder="Enter password" onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Button variant="dark" type="button" className='w-100' onClick={formSubmitHandler}>Login</Button>
      </Form.Group>
      { error ? <Alert variant={'danger'}> {error.message} </Alert> : '' }
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Button variant="primary" type="button" className='w-100' href='http://localhost:3001/auth/googleLogin'>Google Login</Button>
      </Form.Group>
    </Form>
  )
}
