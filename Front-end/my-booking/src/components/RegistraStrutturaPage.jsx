import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function RegistraStruttura() {
  const [formData, setFormData] = useState({
    nome: '',
    città: '',
    indirizzo: '',
    descrizione: '',
    prezzo: '',
    immagini: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'immagini') {
      setFormData({ ...formData, immagini: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'immagini') {
        value.forEach((file) => formToSend.append('immagini', file));
      } else {
        formToSend.append(key, value);
      }
    });
    // fetch POST con backend (es: /api/strutture)
    console.log('Inviato:', formData);
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Registra la tua struttura</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nome struttura</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Città</Form.Label>
              <Form.Control
                type="text"
                name="città"
                value={formData.città}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Indirizzo</Form.Label>
          <Form.Control
            type="text"
            name="indirizzo"
            value={formData.indirizzo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrizione</Form.Label>
          <Form.Control
            as="textarea"
            name="descrizione"
            rows={4}
            value={formData.descrizione}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Prezzo a notte (€)</Form.Label>
              <Form.Control
                type="number"
                name="prezzo"
                value={formData.prezzo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Carica immagini</Form.Label>
              <Form.Control
                type="file"
                name="immagini"
                onChange={handleChange}
                multiple
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary">
          Registra struttura
        </Button>
      </Form>
    </Container>
  );
}

