import { Route, Routes, HashRouter as Router, Link, Navigate } from 'react-router-dom';
// import { useState } from 'react';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SideBar from './SideBar';
import PixByDate from './PixByDate';
import DateSearchForm from './DateSearchForm';
// import DisplayHdPix from './DisplayHdPix';
import DateRangeSearchForm from './DateRangeSearchForm';
import SearchByDateRangeResults from './SearchByDateRangeResults';
// import PixByDateWithClose from './PixByDateWithClose';
import PixByDateWithBack from './PixByDateWithBack';
import FavouritesList from './FavouritesList';

// global variable to store array of objects
const favPix = [];
// to add entry of favourite pix 
const updLike = d => favPix.push(d);

function AstroPixApp(){
  
  
  

  const Redirect = () => <Navigate to="search" replace />

  // console.log("awal2");

  return (
    <Stack direction='row' spacing={15}>
      <Router>
        <div id="sideBar">
          <SideBar />
        </div>
        <div>
          <h1>Astronomy Pictures</h1>
          <DateSearchForm />
          <DateRangeSearchForm /> 
          <hr />
          <Routes>
            <Route path="/" element={ <Redirect /> } />
            <Route path="/search/" element={ <PixByDate updLike={ updLike } /> } />
            <Route path="/search/:query" element={ <PixByDate updLike={ updLike } /> } />
            <Route path="/search/:start/:end" element={ <SearchByDateRangeResults updLike={ updLike } /> } />
            {/* <Route path="/show/:start/:end/:query" element={ <PixByDateWithClose /> } /> */}
            <Route path="/show/:start/:end/:query" element={ <PixByDateWithBack updLike={ updLike } /> } />
            <Route path="/favourites" element={ <FavouritesList list={ favPix } /> } />
            {/* <Route path="/hdpix/" element={ <DisplayHdPix /> } />
            <Route path="/movie/:id" element={ <MovieDetail /> } /> */}
          </Routes>
        </div>
      </Router>
    </Stack>
  
    );

}

export default AstroPixApp;