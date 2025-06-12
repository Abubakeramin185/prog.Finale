import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function HotelFilters({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <Form className="mb-4">
      <Row>
        <Col md={3}>
          <Form.Label>Star Rating</Form.Label>
          <Form.Select name="stars" value={filters.stars} onChange={handleChange}>
            <option value="">All</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Max Price ($)</Form.Label>
          <Form.Control
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="e.g. 200"
          />
        </Col>
        <Col md={3}>
          <Form.Check
            type="checkbox"
            name="wifi"
            label="Wi-Fi"
            checked={filters.wifi}
            onChange={handleChange}
            className="mt-4"
          />
        </Col>
        <Col md={3}>
          <Form.Check
            type="checkbox"
            name="parking"
            label="Parking"
            checked={filters.parking}
            onChange={handleChange}
            className="mt-4"
          />
        </Col>
      </Row>
    </Form>
  );
}

