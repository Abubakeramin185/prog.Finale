import React from 'react';
import { Card } from 'react-bootstrap';

export default function PropertyCard({ hotel, onClick }) {
  return (
    <Card onClick={() => onClick?.(hotel._id)} style={{ cursor: 'pointer' }}>
      <Card.Img
        variant="top"
        src={hotel.image[0]} // prende la prima immagine dall'array
        alt={hotel.name}
      />
      <Card.Body>
        <Card.Title>{hotel.name}</Card.Title>
        <Card.Text>
          {hotel.city} <br />
          {/* Optional chaining per evitare errori se stars/rating non esistono */}
          {hotel.stars ? `${hotel.stars} stelle - ` : ''} 
          {hotel.rating ? `Valutazione: ${hotel.rating}` : ''}
          <br />
          Prezzo: {hotel.price}€
           {hotel.wifi ? "📶 Wi-Fi " : ""} 
          {hotel.parking ? "🅿️ Parcheggio" : ""}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

