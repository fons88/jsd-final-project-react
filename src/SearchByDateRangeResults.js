
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import DateRangeResultsTable from './DateRangeResultsTable';

// import Stack from '@mui/material/Stack';
// import { Route, Routes, HashRouter as Router, Link, Navigate } from 'react-router-dom';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'ck6JfRaH5OyKQUHFxZ3BpB6bmqyGt9jlHHYqb4ez';

function formatDate( strDate ){
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  const year = strDate.slice( 0, 4 );
  const month = strDate.slice( 5, 7 );
  const date = strDate.slice( 8, 10 );

  return ( `${ date } ${ monthNames[ parseInt( month ) - 1 ]} ${ year }`);
}

// search by range of dates
function SearchByDateRangeResults( props ){

  const params = useParams();
  // console.log( params );

  // for nvigate thumbnail clicked
  const navigate = useNavigate();

  const [resultArray, setResultArray] = useState( [] ); 
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( null );

  // let currDate = new Date();
  // let year = currDate.getFullYear();
  // let month = currDate.getMonth() + 1;
  // let date = currDate.getDate();

  // console.log( 'initialData', props );

  // How to run some code ONLY ONCE when the component
  // first appears, "first mounted on the DOM"
  useEffect( () => {
    // console.log( 'useEffect callback running!' );
    renderSearch( params.start, params.end );
  }, [params.start, params.end] ); 
  // second arg [] here means "once on mount"
  // to perform a new AJAX request any time
  // the date picker updates

  function renderSearch( start, end ){

    setLoading( true ); // to show loading message again for subsequent searches
    setError( null ); // reset error
    // console.log( query );

    axios.get ( BASE_URL, {
      params: {
        api_key: API_KEY,
        start_date: start,
        end_date: end
      }
    })
      .then(res => {
        // console.log( 'response', res.data );
        setResultArray( res.data ); // save just the array
        console.log("resultarray", resultArray  );
        setLoading( false ); // finished loading, stop showing loading message
      })
      .catch(err => {
        console.warn('Error loading search results:', err);
        setError( err ); // so we can show an error message to the user
        setLoading( false );
      });

  } 
  // console.log('error', error)
  if( error ){
    // Early return from function on error
    return <strong>There was a problem processing your search. Please try again later.</strong>;
  }

  return (
    <div  className="apod">
      <h3>Search Results</h3>
    {
      loading
      ?
      <p>Loading results...</p>
      :
      // <DateRangeResultsTable list={ resultArray } start={ params.start } end={ params.end } />
      resultArray.map( r => 
        <div onClick={ () => navigate(`/show/${ params.start }/${ params.end }/${ r.date }`) } key={r.date}>{ formatDate( r.date ) } - { r.title }</div>
      )
    }
    </div>
  );

}

export default SearchByDateRangeResults;