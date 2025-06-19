import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

export default function FlightsPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      setError('Tutti i campi sono obbligatori');
      return;
    }

    setError('');
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`http://localhost:3001/api/flights?from=${from}&to=${to}&date=${date}`);
      if (!res.ok) throw new Error('Errore nella fetch');

      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Errore nel recupero dei voli');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

      {loading && <p>Caricamento...</p>}
      {error && <Alert variant="danger">{error}</Alert>}

      {results.map(flight => (
        <Card key={flight._id || flight.id} className="mb-3">
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

      {!loading && results.length === 0 && !error && <p>Nessun volo trovato</p>}
    </Container>
  );
}

