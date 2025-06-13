//Detagli delle alberhi
//  import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Card, Badge, Spinner, Carousel, Button } from 'react-bootstrap';
// import { BsStarFill } from 'react-icons/bs';
// import axios from 'axios';
// import ImageUploader from './ImageUploader';

// export default function HotelDetailPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [hotel, setHotel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`http://localhost:3001/api/hotels/${id}`, {
//           header:{
//             Authorization: `bear${'token'}`
//           }

//              });
//              setHotel(response.data);
//       } catch (error) {
//         console.error('Errore nel caricamento del dettaglio hotel:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, [id]);


//  if (!hotel) return <p>Caricamento in corso...</p>;

//   return (
//     <div className="container mt-4">
//       <h1>{hotel.name}</h1>
//       <p>{hotel.city}</p>
//       <p>Prezzo: {hotel.price}€</p>
//       {/* altro contenuto */}
//     </div>
//   );
//   if (loading) {
//     return (
//       <Container className="mt-4">
//         <Spinner animation="border" />
//         <p>Caricamento hotel...</p>
//       </Container>
//     );
//   }

//   if (!hotel) {
//     return (
//       <Container className="mt-4">
//         <p>Hotel non trovato.</p>
//       </Container>
//     );
//   }

//   const handleBookingClick = () => {
//     navigate(`/booking/${hotel._id}`);
//   };

//   return (
//     <>
//     <ImageUploader/>
//     <Container className="mt-4">
//       <Card className="shadow-sm border-0">
//         {hotel.image.length > 0 && (
//           <Carousel>
//             {hotel.image.map((imgUrl, index) => (
//               <Carousel.Item key={index}>
//                 <img
//                   className="d-block w-100"
//                   src={imgUrl}
//                   alt={`Foto ${index + 1}`}
//                   style={{ height: '300px', objectFit: 'cover' }}
//                 />
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         )}

//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center">
//             <Card.Title>{hotel.name}</Card.Title>
//             {hotel.stars && (
//               <Badge bg="warning" text="dark">
//                 {hotel.stars} <BsStarFill className="mb-1" />
//               </Badge>
//             )}
//           </div>
//           <Card.Text className="text-muted mb-2">{hotel.city}</Card.Text>
//           <Card.Text>
//             <strong>Prezzo:</strong> €{hotel.price} / notte<br />
//             {hotel.rating && <>⭐ Valutazione: {hotel.rating} / 10<br /></>}
//             {hotel.description && <><strong>Descrizione:</strong> {hotel.description}<br /></>}
//           </Card.Text>

//           <Button variant="primary" onClick={handleBookingClick}>
//             Prenota ora
//           </Button>
//         </Card.Body>
//       </Card>
//     </Container>
    
//       </>
//   );
// }











import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Badge, Spinner, Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import axios from 'axios';

export default function HotelDetailPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/hotels');
        const foundHotel = response.data.find(h => h._id === id);
        setHotel(foundHotel);
      } catch (error) {
        console.error('Errore nel caricamento del dettaglio hotel:', error);
      } finally {
        setLoading(false);
      }
    };
    


    fetchHotels();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" />
        <p>Caricamento hotel...</p>
      </Container>
    );
  }

  if (!hotel) {
    return (
      <Container className="mt-4">
        <p>Hotel non trovato.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm border-0">
        
        {hotel.image.length > 0 && (
          <Carousel>
            {hotel.image.map((imgUrl, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={imgUrl}
                  alt={`Foto ${index + 1}`}
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
           

        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>{hotel.name}</Card.Title>
            {hotel.stars && (
              <Badge bg="warning" text="dark">
                {hotel.stars} <BsStarFill className="mb-1" />
              </Badge>
            )}
          </div>
          <Card.Text className="text-muted mb-2">{hotel.city}</Card.Text>
          <Card.Text>
            <strong>Prezzo:</strong> €{hotel.price} / notte<br />
            {hotel.rating && <>⭐ Valutazione: {hotel.rating} / 10<br /></>}
            {hotel.description && <><strong>Descrizione:</strong> {hotel.description}<br /></>}
        
             
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Card, Badge } from 'react-bootstrap';
// import { BsStarFill } from 'react-icons/bs';

// const hotels = [
//   { id: 1, name: 'Hotel Paradise', location: 'Rome', price: 120, stars: 4, rating: 4.5, wifi: true, parking: true, image: "/images/hotelf.jpg"},
//   { id: 1, name: 'Hotel Paradise', location: 'Rome', price: 120, stars: 4, rating: 4.5, wifi: true, parking: true, image: "/images/afrihotel.jpg"},
//   { id: 1, name: 'Hotel Paradise', location: 'Rome', price: 120, stars: 4, rating: 4.5, wifi: true, parking: true, image: "/images/dalal.jpg"},
//   { id: 1, name: 'Hotel Paradise', location: 'Rome', price: 120, stars: 4, rating: 4.5, wifi: true, parking: true, image: "/images/gonow.jpg"},
//   { id: 1, name: 'Hotel Paradise', location: 'Rome', price: 120, stars: 4, rating: 4.5, wifi: true, parking: true, image: "/images/hoteltchad.jpg"},
//   { id: 1, name: 'Hotel Paradise', location: 'Rome', price: 120, stars: 4, rating: 4.5, wifi: true, parking: true, image: "/images/newhotel.jpg"},
    

// ];


// export default function HotelDetailPage() {
//   const { id } = useParams();
//   const hotel = hotels.find(h => h.id === parseInt(id));

//   if (!hotel) return <Container className="mt-4"><p>Hotel not found</p></Container>;

//   return (
//     <Container className="mt-4">
//       <Card className="shadow-sm border-0">
//         <Card.Img variant="top" src={hotel.image} alt={hotel.name} style={{ height: '300px', objectFit: 'cover' }} />
//         <Card.Body>
//           <div className="d-flex justify-content-between align-items-center">
//             <Card.Title>{hotel.name}</Card.Title>
//             <Badge bg="warning" text="dark">
//               {hotel.stars} <BsStarFill className="mb-1" />
//             </Badge>
//           </div>
//           <Card.Text className="text-muted mb-2">{hotel.location}</Card.Text>
//           <Card.Text>
//             <strong>Price:</strong> ${hotel.price} / night<br />
//             <strong>User Rating:</strong> {hotel.rating} / 5<br />
//             {hotel.wifi && <span className="me-2">Wi-Fi available</span>}
//             {hotel.parking && <span>Parking available</span>}
//           </Card.Text>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// }

