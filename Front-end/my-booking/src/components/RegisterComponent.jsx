import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function FormRegister() {

  const [user, setUser] = useState({});
 const navigate = useNavigate();

 const formHandler = (e) => {
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
 }

 const formSubmitHandler = () => {
    /* console.log(user) */

    /* 
        const config = {headers: {'Content-Type': 'application/json'}}
        fetch('http://localhost:3001/auth/register', {method: 'POST', body: JSON.stringify(user)}, config)
                .then(response => response.json())
                .then(json => console.log(json))
                .catch(error => console.error(error)) 
    */

    axios.post('http://localhost:3001/auth/register',)
        .then(response => {
          console.log(response)
          navigate('/login')
        })
        .catch(error => console.error(error)) 
 }


  return (
    <Form className='my-5'>
      <Form.Group className="mb-3" controlId="fullname">
        <Form.Control type="text" name="fullname" placeholder="Enter fullname" onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="username">
        <Form.Control type="text" name="username" placeholder="Enter username" onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Control type="email" name="email" placeholder="Enter email" onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Control type="password" name="password" placeholder="Enter password" onChange={formHandler} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Button variant="dark" type="button" className='w-100' onClick={formSubmitHandler}>Register</Button>
      </Form.Group>
    </Form>
  )
}
