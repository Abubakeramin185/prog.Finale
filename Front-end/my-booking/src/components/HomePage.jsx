import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import PropertyCard from './PropertyCard';
import Filters from './Filters';
import Offers from './Offers';
import AreaCommenti from './AreaCommenti';
import FooterComponent from './FooterComponent';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // 🔓 Nessun token richiesto
        const response = await axios.get("http://localhost:3001/api/hotels");
        setHotels(response.data);
        setFilteredHotels(response.data);
      } catch (error) {
        console.error('Errore nel caricamento degli hotel:', error);
      }
    };

    fetchHotels();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    const filtered = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  return (
    <>
      <SearchBar />
      <Filters />
      <Offers />

      <Form className="mt-4">
        <Row>
          <Col className="mb-3">
            <Form.Control
              type="text"
              placeholder="Cerca hotel per nome..."
              value={search}
              onChange={handleSearch}
            />
          </Col>
        </Row>
      </Form>

      <h2 className="text-center my-4">Siamo felici di accogliervi nella struttura</h2>

      <Container className="mt-4 mb-5">
        <Row>
          {filteredHotels.map((hotel) => (
            <Col key={hotel._id} md={4} className="mb-3">
              <PropertyCard hotel={hotel} onClick={handleCardClick} />
            </Col>
          ))}
        </Row>
      </Container>

      <AreaCommenti />
      <FooterComponent />
    </>
  );
}





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import PropertyCard from './PropertyCard';
// import Filters from './Filters';
// import Offers from './Offers';
// import AreaCommenti from './AreaCommenti';
// import FooterComponent from './FooterComponent';
// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// export default function HomePage() {
//   const [hotels, setHotels] = useState([]);
//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchHotels();
//   }, []);

//   const fetchHotels = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get("http://localhost:3001/api/hotels", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setHotels(response.data);
//       setFilteredHotels(response.data);
//     } catch (error) {
//       console.error('Errore nel caricamento degli hotel:', error);
//     }
//   };

//   const handleCardClick = (id) => {
//     navigate(`/hotels/${id}`);
//   };

//   const handleSearch = (event) => {
//     const value = event.target.value;
//     setSearch(value);
//     const filtered = hotels.filter(hotel =>
//       hotel.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredHotels(filtered);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:3001/api/hotels/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       fetchHotels();
//     } catch (error) {
//       console.error("Errore durante l'eliminazione dell'hotel:", error);
//     }
//   };

//   return (
//     <>
//       <SearchBar />
//       <Filters />
//       <Offers />

//       <Form className="mt-4">
//         <Row>
//           <Col className="mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Cerca hotel per nome..."
//               value={search}
//               onChange={handleSearch}
//             />
//           </Col>
//         </Row>
//       </Form>

//       <h2>Siamo felici di accogliervi nella struttura</h2>

//       <Container className="mt-4 mb-6">
//         <Row>
//           {filteredHotels.map((hotel) => (
//             <Col key={hotel._id} md={4} className="mb-4">
//               <PropertyCard hotel={hotel} onClick={handleCardClick} />
//               <Button variant="danger" size="sm" onClick={() => handleDelete(hotel._id)} className="mt-2">
//                 Elimina
//               </Button>
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       <AreaCommenti />
//       <FooterComponent />
//     </>
//   );
// }







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SearchBar from './SearchBar';
// import PropertyCard from './PropertyCard';
// import Filters from './Filters';
// import Offers from './Offers';
// import AreaCommenti from './AreaCommenti';
// import FooterComponent from './FooterComponent';
// import { Container, Row, Col, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';



// export default function HomePage() {
//   const [hotels, setHotels] = useState([]);
//   const [filteredHotels, setFilteredHotels] = useState([]);
//   const [search, setSearch] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get("http://localhost:3001/api/hotels", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setHotels(response.data);
//         setFilteredHotels(response.data);
//       } catch (error) {
//         console.error('Errore nel caricamento degli hotel:', error);
//       }
//     };

//     fetchHotels();
//   }, []);

//   const handleCardClick = (id) => {
//     navigate(`/hotels/${id}`);
//   };

//   const handleSearch = (event) => {
//     const value = event.target.value;
//     setSearch(value);
//     const filtered = hotels.filter(hotel =>
//       hotel.name.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredHotels(filtered);
//   };

//   return (
//     <>
    
//       <SearchBar />
//       <Filters />
//       <Offers />

//       <Form className="mt-4">
//         <Row>
//           <Col className="mb-3">
//             <Form.Control
//               type="text"
//               placeholder="Cerca hotel per nome..."
//               value={search}
//               onChange={handleSearch}
//             />
//           </Col>
//         </Row>
//       </Form>
//         <h2>Siamo felice ad accogliervi nella strattura</h2>
//       <Container className="mt-4 mb-6">
//         <Row>
//           {filteredHotels.map((hotel) => (
//             <Col key={hotel._id} md={2} className="mb-4" >
//               <PropertyCard hotel={hotel} onClick={handleCardClick} />
//             </Col>
//           ))}
//         </Row>
//       </Container>

//       <AreaCommenti />
//       <FooterComponent />
//     </>
//   );
// }

