import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export default function BookingPage() {
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Prenotazione confermata per hotel con ID: ${id}`);
  };

  return (
    <Container className="mt-4">
      <h2>Prenota il tuo soggiorno</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data Check-In</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Data Check-Out</Form.Label>
          <Form.Control type="date" required />
        </Form.Group>
        <Button type="submit">Conferma Prenotazione</Button>
      </Form>
    </Container>
  );
}










// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Form, Button } from 'react-bootstrap';

// export default function BookingPage() {
//   const { id } = useParams();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Prenotazione confermata per hotel con ID: ${id}`);
//   };

//   return (
//     <Container className="mt-4">
//       <h2>Prenota il tuo soggiorno</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Nome</Form.Label>
//           <Form.Control type="text" required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Data Check-In</Form.Label>
//           <Form.Control type="date" required />
//         </Form.Group>
//         <Form.Group className="mb-3">
//           <Form.Label>Data Check-Out</Form.Label>
//           <Form.Control type="date" required />
//         </Form.Group>
//         <Button type="submit">Conferma Prenotazione</Button>
//       </Form>
//     </Container>
//   );
// }

