
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Stack from '@mui/material/Stack';
// import TopGainers from './TopGainers';
// import DefaultPix from './DefaultPix';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'ck6JfRaH5OyKQUHFxZ3BpB6bmqyGt9jlHHYqb4ez';

function formatDate( strDate ){
  const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  const year = strDate.slice( 0, 4 );
  const month = strDate.slice( 5, 7 );
  const date = strDate.slice( 8, 10 );

  console.log( date, month, year);

  return ( `${ date } ${ monthNames[ parseInt( month ) - 1 ]} ${ year }`);
}

function PixByDate( props ){

  const params = useParams();
  console.log( params );

  // for nvigate thumbnail clicked
  const navigate = useNavigate();

  const [picData, setPicData] = useState( {} ); 
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( null );

  // setError( null );

  let currDate = new Date();
  let year = currDate.getFullYear();
  let month = currDate.getMonth() + 1;
  let date = currDate.getDate();

  console.log( 'initialData', props );

  // How to run some code ONLY ONCE when the component
  // first appears, "first mounted on the DOM"
  useEffect( () => {
    console.log( 'useEffect callback running!' );
    renderPixDesc( params.query );
  }, [params.query] ); 
  // second arg [] here means "once on mount"
  // to perform a new AJAX request any time
  // the date picker updates

  function renderPixDesc( query ){

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
  // console.log('error', error)
  if( error ){
    // setError (null);
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
        // <DefaultPix searchDate = { `${ year }-${ month < 10 ? '0'month : month }-${date}`} />
        <div className='apod'> 
          <p>{ formatDate( picData.date ) }</p>
          <h3>{ picData.title }</h3>
          <img src={ picData.url } alt={ picData.title } />
          <figcaption>{ picData.explanation }</figcaption>
        </div>
    }
    </div>
  );

}

export default PixByDate;