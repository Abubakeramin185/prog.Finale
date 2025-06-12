import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const dummyCars = [
  { id: 1, location: 'Milano', price: 30, model: 'Fiat Panda', type: 'Economy', transmission: 'Manuale' },
  { id: 2, location: 'Roma', price: 45, model: 'Volkswagen Golf', type: 'Standard', transmission: 'Automatica' },
];

export default function CarRentalPage() {
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location || !start || !end) {
      setError('Tutti i campi sono obbligatori');
      return;
    }

    const matches = dummyCars.filter(car => car.location.toLowerCase() === location.toLowerCase());
    setResults(matches);
    setError('');
  };

  return (
    <Container className="mt-4">
      <h2>Noleggia un'auto</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Label>Località</Form.Label>
            <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} />
          </Col>
          <Col md={4}>
            <Form.Label>Ritiro</Form.Label>
            <Form.Control type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
          </Col>
          <Col md={4}>
            <Form.Label>Riconsegna</Form.Label>
            <Form.Control type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <Button type="submit" className="w-100">Cerca auto</Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {results.map(car => (
        <Card key={car.id} className="mb-3">
          <Card.Body>
            <Card.Title>{car.model}</Card.Title>
            <Card.Text>
              Tipo: {car.type}<br />
              Prezzo: €{car.price}/giorno<br />
              Cambio: {car.transmission}
            </Card.Text>
            <Button>Prenota</Button>
          </Card.Body>
        </Card>
      ))}

      {results.length === 0 && !error && <p>Nessuna auto trovata</p>}
    </Container>
  );
}

