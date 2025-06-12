import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const dummyFlights = [
  { id: 1, from: 'Roma', to: 'Londra', date: '2025-06-10', airline: 'Ryanair', price: 59, time: '10:30 - 12:00' },
  { id: 2, from: 'Roma', to: 'Madrid', date: '2025-06-10', airline: 'ITA Airways', price: 89, time: '14:00 - 16:30' },
];

export default function FlightsPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      setError('Tutti i campi sono obbligatori');
      return;
    }

    const matches = dummyFlights.filter(f =>
      f.from.toLowerCase() === from.toLowerCase() &&
      f.to.toLowerCase() === to.toLowerCase() &&
      f.date === date
    );

    setResults(matches);
    setError('');
  };

  return (
    <Container className="mt-4">
      <h2>Cerca Voli</h2>
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Label>Da</Form.Label>
            <Form.Control value={from} onChange={(e) => setFrom(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Label>A</Form.Label>
            <Form.Control value={to} onChange={(e) => setTo(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Label>Data</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button type="submit" className="w-100">Cerca voli</Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {results.map(flight => (
        <Card key={flight.id} className="mb-3">
          <Card.Body>
            <Card.Title>{flight.from} → {flight.to}</Card.Title>
            <Card.Text>
              Compagnia: {flight.airline}<br />
              Prezzo: €{flight.price}<br />
              Orario: {flight.time}
            </Card.Text>
            <Button>Prenota</Button>
          </Card.Body>
        </Card>
      ))}

      {results.length === 0 && !error && <p>Nessun volo trovato</p>}
    </Container>
  );
}

