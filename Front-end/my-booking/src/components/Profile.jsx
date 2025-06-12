import React from 'react';
import { Card, Button } from 'react-bootstrap';


export default function Profile({ user }) {
  return (
    <>
    <Card className="shadow-sm mt-4" style={{ maxWidth: '400px', margin: 'auto' }}>
      <Card.Img variant="top" src={user.avatar || 'https:/localhost3001'} />
      <Card.Body>
        <Card.Title>{user.name}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {user.email}<br />
          <strong>Telefono:</strong> {user.phone || 'Non disponibile'}<br />
          <strong>Paese:</strong> {user.country || 'Non specificato'}
        </Card.Text>
        <Button variant="primary" className="me-2">Modifica profilo</Button>
        <Button variant="outline-danger">Logout</Button>
      </Card.Body>
    </Card>

   </>
  );
}


