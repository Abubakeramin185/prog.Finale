// HotelCard.jsx
// import React from 'react';
// import { Card, Button, Badge } from 'react-bootstrap';
// import { StarFill } from 'react-bootstrap-icons';

// export default function HotelCard({ hotel, onViewDetails }) {
//   return (
//     <Card className="mb-4 shadow-sm border-0">
//        <Card.Img variant="top" src="/images/hotelf.jpg" alt="Hotelf" />
//       <Card.Body>
//         <Card.Title>Hotel Bello</Card.Title>
//         <Card.Text>
//           Situato nel centro, 4 stelle, ottime recensioni.
//         </Card.Text>
    
//         <div className="d-flex justify-content-between align-items-start">
//           <Card.Title className="mb-1">{hotel.name}</Card.Title>
//           <Badge bg="success">
//             {hotel.rating} <StarFill className="mb-1" />
//           </Badge>
//         </div>
//         <Card.Text className="text-muted mb-2">{hotel.location}</Card.Text>
//         <Card.Text className="fw-bold">
//           ${hotel.price} <small className="text-muted">/ night</small>
//         </Card.Text>
//         <Button variant="outline-primary" size="sm" onClick={onViewDetails}>
//           View Details
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// }
import React from 'react';
import { Card } from 'react-bootstrap';

export default function HotelCard({ hotel }) {
  return (
    <Card>
      <Card.Img variant="top" src={hotel.image[0]} />
      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <Card.Text>{hotel.city}</Card.Text>
        <Card.Text>€ {hotel.price} / notte</Card.Text>
      </Card.Body>
    </Card>
  );
}


