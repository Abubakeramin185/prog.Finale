import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const navigate = useNavigate();
  

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      location,
      checkIn,
      checkOut,
    }).toString();

    navigate(`/hotels?${queryParams}`);
  };
  const handlePrenota = () =>{
    navigate('prenota')
  }

  return (
    <Form onSubmit={handleSearch}>
      <Row className="gy-2">
        <Col sm={12} md={4}>
          <Form.Control
            type="text"
            placeholder="Dove vuoi andare?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
        <Col sm={6} md={3}>
          <Form.Control
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </Col>
        <Col sm={6} md={3}>
          <Form.Control
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </Col>
        <Col sm={12} md={2}>
         <Button type="submit" variant="primary" className="w-100" onClick={handlePrenota} >Prenota</Button>
          <Button type="submit" variant="primary" className="w-100">Cerca</Button>
        </Col>
      </Row>
    </Form>
  );
}



// import React, { useState } from 'react';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// export default function SearchBar() {
//   const [location, setLocation] = useState('');
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate('/hotels'); // Puoi passare anche `?location=xxx`
//   };

//   return (
//     <Form onSubmit={handleSearch}>
//       <Row>
//         <Col sm={9}>
//           <Form.Control
//             type="text" 
//             placeholder="Where are you going?"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </Col>
//         <Col sm={3}>
//           <Button type="submit" variant="primary" block="true">Search</Button>
//         </Col>
//       </Row>
//     </Form>
//   );
// }

