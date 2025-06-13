import React, { useState, useEffect } from 'react';
import HotelFilters from './HotelFilters';
import PropertyCard from './PropertyCard';
import { useNavigate } from 'react-router-dom';

export default function HotelsPage() {
  const [filters, setFilters] = useState({
    stars: '',
    maxPrice: '',
    wifi: false,
    parking: false,
  });

  const [filteredHotels, setFilteredHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/api/hotels') // oppure carica da file JSON
      .then((res) => res.json())
      .then((data) => {
        setAllHotels(data);
        setFilteredHotels(data); // iniziale
      });
  }, []);

  useEffect(() => {
    let result = allHotels;

    if (filters.stars) {
      result = result.filter((hotel) => hotel.stars === Number(filters.stars));
    }

    if (filters.maxPrice) {
      result = result.filter((hotel) => hotel.price <= Number(filters.maxPrice));
    }

    if (filters.wifi) {
      result = result.filter((hotel) => hotel.wifi === true);
    }

    if (filters.parking) {
      result = result.filter((hotel) => hotel.parking === true);
    }

    setFilteredHotels(result);
  }, [filters, allHotels]);
  const handleHotelClick = (hotelId) => {
    navigate(`/hotels/${hotelId}`);
  };

  return (
    <div className="container mt-4">
      <HotelFilters filters={filters} setFilters={setFilters} />
      <div className="row">
        {filteredHotels.map((hotel) => (
          <div key={hotel._id} className="col-md-4 mb-4">
            <PropertyCard hotel={hotel}  onClick={handleHotelClick}/>
          </div>
        ))}
      </div>
    </div>
  );
}






// import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Container, Row, Col } from 'react-bootstrap';
// import HotelCard from '../components/HotelCard';
// import HotelFilters from '../components/HotelFilters';

// const hotelsData = [
//   {
//     id: 1,
//     name: "Hotel Paradise",
//     location: "Rome, Italy",
//     price: 120,
//     stars: 4,
//     wifi: true,
//     parking: false,
//     image: "/image/fotoistan.jpg",
//   },
//   {
//     id: 2,
//     name: "Luxury Suites",
//     location: "Paris, France",
//     price: 200,
//     stars: 5,
//     wifi: true,
//     parking: true,
//     image: "image/foto",
//   },
//   {
//     id: 3,
//     name: "Budget Inn",
//     location: "Berlin, Germany",
//     price: 70,
//     stars: 3,
//     wifi: false,
//     parking: true,
//     image: "http://localhost:3001/auth/",
//   },
// ];

// export default function HotelsPage() {
//     const [searchParams, setSearchParams] = useSearchParams();
//   const [filters, setFilters] = useState({
//     stars: searchParams.get('stars') || '',
//   maxPrice: searchParams.get('maxPrice') || '',
//   wifi: searchParams.get('wifi') === 'true',
//   parking: searchParams.get('parking') === 'true',
//   rating: searchParams.get('rating') || '',
//   });

//   const filteredHotels = hotelsData.filter((hotel) => {
//     const starMatch = filters.stars ? hotel.stars === parseInt(filters.stars) : true;
//     const priceMatch = filters.maxPrice ? hotel.price <= parseFloat(filters.maxPrice) : true;
//     const wifiMatch = filters.wifi ? hotel.wifi === true : true;
//     const parkingMatch = filters.parking ? hotel.parking === true : true;
//     return starMatch && priceMatch && wifiMatch && parkingMatch;
//   });

//   return (
//     <Container className="mt-4">
//       <h2>Available Hotels</h2>
//       <HotelFilters filters={filters} setFilters={setFilters} />
//       <Row>
//         {filteredHotels.map((hotel) => (
//           <Col key={hotel.id} md={4} className="mb-4">
//             <HotelCard hotel={hotel} />
//           </Col>
//         ))}
//         {filteredHotels.length === 0 && (
//           <p className="text-muted mt-3">No hotels match your filters.</p>
//         )}
//       </Row>
//     </Container>
//   );
// }
