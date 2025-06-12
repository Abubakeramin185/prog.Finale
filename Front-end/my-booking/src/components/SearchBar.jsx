import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/hotels'); // Puoi passare anche `?location=xxx`
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row>
        <Col sm={9}>
          <Form.Control
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
        <Col sm={3}>
          <Button type="submit" variant="primary" block="true">Search</Button>
        </Col>
      </Row>
    </Form>
  );
}

