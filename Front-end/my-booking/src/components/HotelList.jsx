// HotelList.jsx
// import React from 'react';
// import HotelCard from './HotelCard';

// const hotels = [
//   {
//     id: 1,
//     name: 'Hotel Roma Center',
//     image: '/images/hotelf.jpg',
//     location: 'Roma, Italia',
//     rating: 4.5,
//     price: 120,
//   },
//   // …
// ];

// export default function HotelList() {
//   return (
//     <div className="row">
//       {hotels.map(hotel => (
//         <div className="col-md-4" key={hotel.id}>
//           <HotelCard hotel={hotel.image} onViewDetails={() => {}} />
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard'; // o PropertyCard

export default function HotelList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/hotels')
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error('Errore nel fetch:', err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Hotel disponibili</h2>
      <div className="row">
        {hotels.map((hotel, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <HotelCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
}


