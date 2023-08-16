
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'ck6JfRaH5OyKQUHFxZ3BpB6bmqyGt9jlHHYqb4ez';

function formatDate( strDate ){
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  const year = strDate.slice( 0, 4 );
  const month = strDate.slice( 5, 7 );
  const date = strDate.slice( 8, 10 );

  // console.log( date, month, year);

  return ( `${ date } ${ monthNames[ parseInt( month ) - 1 ]} ${ year }`);
}

// added back button to go back to lit of date populate by date range search
export default function PixByDateWithClose( props ){

  const params = useParams();
  // console.log( params );

  const navigate = useNavigate();

  const [picData, setPicData] = useState( {} ); 
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( null );

  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;
  let date = currDate.getDate();

  // console.log( 'initialData', props );

  // single line function to handle click
  const handleClick = () => navigate(`/search/${ params.start }/${ params.end }`);

  // How to run some code ONLY ONCE when the component
  // first appears, "first mounted on the DOM"
  useEffect( () => {
    // console.log( 'useEffect callback running!' );
    renderPixDesc( params.query, params.start, params.end );
  }, [params.query] ); 
  // second arg [] here means "once on mount"
  // to perform a new AJAX request any time
  // the date picker updates

  function renderPixDesc( query, start, end ){

    setLoading( true ); // to show loading message again for subsequent searches
    setError( null ); // reset error
    // console.log( query );

    axios.get ( BASE_URL, {
      params: {
        api_key: API_KEY,
        date: query,
      }
    })
      .then(res => {
        // console.log( 'response', res.data );
        setPicData( res.data ); // save just the object
        // console.log("data", picData  );
        setLoading( false ); // finished loading, stop showing loading message
      })
      .catch(err => {
        console.warn('Error loading search results:', err);
        setError( err ); // so we can show an error message to the user
        setLoading( false );
      });

  } // renderPixDesc

  if( error ){
    // Early return from function on error
    return <strong>There was a problem processing your search. Please try again later.</strong>;
  }

  return (
    <div  className="apod">
    {
      loading
      ?
      <p>Loading results...</p>
      :
        <div className='apod'> 
          <Button variant="contained" onClick={ handleClick }>Back to Search List</Button>
          <p>{ formatDate( picData.date ) }</p>
          <h3>{ picData.title }</h3>
          <img src={ picData.url } alt={ picData.title } />
          <figcaption>{ picData.explanation }</figcaption>
        </div>
    }
    </div>
  );

}

