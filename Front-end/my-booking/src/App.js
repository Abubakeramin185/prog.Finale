import React from 'react';
import  './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import HotelsPage from './components/HotelsPage';
import HotelDetailPage from './components/HotelDetailPage';
import NavbarComponent from './components/NavbarComponent';
import FlightsPage from './components/FlightsPage';
import CarRentalPage from './components/CarRentalPage';
import FormRegister from './components/RegisterComponent';
import FormLogin from './components/ComponentLogin'
import HotelList from './components/HotelList';
import HotelCard from './components/HotelCard';
import RegisterComponent from './components/RegisterComponent'
import FooterComponent from './components/FooterComponent'
import AreaCommenti from './components/AreaCommenti';
import ImageUploader from './components/ImageUploader';
import ProfilePage from './components/ComponentProfile';
import BookingPage from './components/BookingPage';




function App() {
  return (
    <>
    <NavbarComponent/>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        <Route path="/flights" element={<FlightsPage/>}/>
        <Route path='/cars' element={<CarRentalPage/>}/>
        <Route path='/form' element={<FormRegister/>}/>
        <Route path='/login' element={<FormLogin/>}/> 
         <Route path="/lists" element={<HotelList/>}/> 
          <Route path='/card' element={<HotelCard/>}/>
         <Route path="/Register" element={<RegisterComponent/>}/>
          <Route path="/footer" element={<FooterComponent/>}/>
          <Route path='areacommenti' element={<AreaCommenti/>}/>
          <Route path='imageuploader' element={<ImageUploader/>}/>
          <Route path='page' element={<ProfilePage/>}/>
          <Route path='/book/:id' element={<BookingPage/>}/>
          

          
        
      </Routes>
    
    </>
  );
}

export default App;
