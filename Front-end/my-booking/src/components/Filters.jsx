import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function Filters() {
  return (
    <Form className="my-3">
      <Row>
        <Col md={3}>
          <Form.Select>
            <option>Stelle</option>
            <option>5 stelle</option>
            <option>4 stelle</option>
            <option>3 stelle</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Prezzo</option>
            <option>0 - 100€</option>
            <option>100 - 200€</option>
            <option>200€+</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Recensioni</option>
            <option>8+</option>
            <option>9+</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
}

