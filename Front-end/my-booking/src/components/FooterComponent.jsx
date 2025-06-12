import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function FooterComponent() {
  return (
    <footer className="bg-light text-dark py-5 mt-5 border-top">
      <Container>
        <Row>
          <Col md={3} sm={6} className="mb-4">
            <h5>Assistenza</h5>
            <ul className="list-unstyled">
              <li><a href="#">Centro Assistenza</a></li>
              <li><a href="#">Contattaci</a></li>
              <li><a href="#">Cancellazioni</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5>Informazioni</h5>
            <ul className="list-unstyled">
              <li><a href="#">Chi siamo</a></li>
              <li><a href="#">Carriere</a></li>
              <li><a href="#">Sostenibilità</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5>Business</h5>
            <ul className="list-unstyled">
              <li><a href="#">Registra la tua struttura</a></li>
              <li><a href="#">Partner</a></li>
              <li><a href="#">Affiliate Program</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-4">
            <h5>Seguici</h5>
            <ul className="list-unstyled">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </Col>
        </Row>
        <Row className="pt-4 border-top">
          <Col className="text-center">
            <small>&copy; {new Date().getFullYear()} Booking Clone. Tutti i diritti riservati.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

