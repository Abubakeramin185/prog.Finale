import React, { useState } from 'react';
import { Container, Card, Button, Form, ListGroup, Modal } from 'react-bootstrap';
import ImageUploader from './ImageUploader';

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: 'Mario Rossi',
    email: 'mario.rossi@example.com',
    phone: '+39 333 1234567',
    country: 'Italia',
    avatar: 'http://localhost:3001/auth/login',
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [bookings] = useState([
    { id: 1, hotel: 'Hotel Roma', date: '2025-05-10', price: 120 },
    { id: 2, flight: 'Roma → Londra', date: '2025-06-01', price: 75 },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUser(prev => ({ ...prev, avatar: previewUrl }));
      setAvatarFile(file); // in un backend reale, qui lo invieresti
    }
  };

  return (
     <>
    <Container className="mt-4">
      <h2 className="text-center">Profilo Utente</h2>
      <Card className="shadow-sm mt-3" style={{ maxWidth: '500px', margin: 'auto' }}>
        <Card.Img variant="top" src={user.avatar} />
        <Card.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nome</Form.Label>
              <Form.Control name="name" value={user.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={user.email} disabled />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Telefono</Form.Label>
              <Form.Control name="phone" value={user.phone} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Paese</Form.Label>
              <Form.Control name="country" value={user.country} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cambia Avatar</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
            </Form.Group>
            <Button variant="primary" className="me-2">Salva</Button>
            <Button variant="outline-secondary" onClick={() => setShowPasswordModal(true)}>Cambia password</Button>
          </Form>
        </Card.Body>
      </Card>

      <h4 className="mt-5">Prenotazioni passate</h4>
      <ListGroup>
        {bookings.map(b => (
          <ListGroup.Item key={b.id}>
            {b.hotel || b.flight} – {b.date} – <strong>€{b.price}</strong>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal cambio password */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cambia password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Password attuale</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nuova password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Conferma nuova password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Annulla</Button>
          <Button variant="primary">Conferma</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    <ImageUploader/>
   </>
  );
}

