import React, { useState } from 'react';
import { Form, Button, ListGroup, Row, Col } from 'react-bootstrap';

export default function AreaCommenti() {
  const [commenti, setCommenti] = useState([]);
  const [testo, setTesto] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInvia = () => {
    if (testo.trim() === '') return;

    if (editingIndex !== null) {
      // Modifica commento
      const nuoviCommenti = [...commenti];
      nuoviCommenti[editingIndex] = testo;
      setCommenti(nuoviCommenti);
      setEditingIndex(null);
    } else {
      // Aggiunta nuovo commento
      setCommenti([...commenti, testo]);
    }

    setTesto('');
  };

  const handleModifica = (index) => {
    setTesto(commenti[index]);
    setEditingIndex(index);
  };

  const handleElimina = (index) => {
    const nuoviCommenti = commenti.filter((_, i) => i !== index);
    setCommenti(nuoviCommenti);
    if (editingIndex === index) {
      setTesto('');
      setEditingIndex(null);
    }
  };

  return (
    <div className="mt-4">
      <h5>Commenti</h5>
      <Form>
        <Form.Group controlId="formCommento">
          <Form.Control
            type="text"
            placeholder="Scrivi un commento..."
            value={testo}
            onChange={(e) => setTesto(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" onClick={handleInvia}>
          {editingIndex !== null ? 'Modifica' : 'Aggiungi'}
        </Button>
      </Form>

      <ListGroup className="mt-3">
        {commenti.map((c, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col>{c}</Col>
              <Col xs="auto">
                <Button size="sm" variant="outline-primary" onClick={() => handleModifica(index)}>
                  ✏️
                </Button>{' '}
                <Button size="sm" variant="outline-danger" onClick={() => handleElimina(index)}>
                  🗑️
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

