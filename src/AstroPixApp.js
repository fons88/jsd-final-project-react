import { Route, Routes, HashRouter as Router, Link, Navigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SideBar from './SideBar';
import PixByDate from './PixByDate';

import SearchForm from './SearchForm';

import DisplayHdPix from './DisplayHdPix';
import DateRangeSearch from './DateRangeSearch';

function AstroPixApp(){

  const Redirect = () => (
    <Navigate to="search" replace />
  )

  // console.log("awal2");

  return (
    <Stack direction='row' spacing={15}>
      <Router>
        <div id="sideBar">
          <SideBar />
        </div>
        <div>
          <h1>Astronomy Pix of the day</h1>
          <SearchForm />
          <DateRangeSearch /> 
          <hr />
          <Routes>
            <Route path="/" element={ <Redirect /> } />
            <Route path="/search/" element={ <PixByDate /> } />
            <Route path="/search/:query" element={ <PixByDate /> } />
            <Route path="/hdpix/" element={ <DisplayHdPix /> } />
            {/* <Route path="/search/:query" element={ <SearchResults /> } />
            <Route path="/movie/:id" element={ <MovieDetail /> } /> */}
          </Routes>
        </div>
      </Router>
    </Stack>
  
    );

}

export default AstroPixApp;