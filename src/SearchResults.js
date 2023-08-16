
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import MovieDetail from './MovieDetail';

const BASE_URL = 'https://api.disneyapi.dev';

const generateMoviePosterUrl = ( movie ) => {
  return `https://image.tmdb.org/t/p/w94_and_h141_bestv2${movie.poster_path}`;
};

function SearchResults( props ){

  const params = useParams();
  console.log( params );

  // So we can navigate to a new page like when a thumbnail is clicked
  const navigate = useNavigate();

  const [movies, setMovies] = useState( [] ); 
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( null );

  console.log( 'SearchResults render()' );

  // How to run some code ONLY ONCE when the component
  // first appears, "first mounted on the DOM"
  useEffect( () => {
    console.log( 'useEffect callback running!' );
    loadSearchResults( params.query );
  }, [params.query] ); // second arg [] here means "once on mount"
  // Adding variables to this array means "if any of these change
  // from one render to the next, run the useEffect callback again",
  // i.e. here we want to perform a new AJAX request any time
  // the search text updates

  function loadSearchResults( query ){

    setLoading( true ); // to show loading message again for subsequent searches

    axios.get ( TMDB_BASE_URL + 'search/movie' , {
      params: {
        query: query,
        api_key: TMDB_API_KEY,
        page: 1
      }
    })
      .then(res => {
        // renderSearchResults(res.data.photos.photo);
        console.log( 'response', res.data );
        setMovies( res.data.results ); // save just the array
        setLoading( false ); // finished loading, stop showing loading message
      })
      .catch(err => {
        console.warn('Error loading search results:', err);
        setError( err ); // so we can show an error message to the user
        setLoading( false );
      });


  } // loadSearchResults()

  if( error ){
    // Early return from function on error
    return <strong>There was a problem processing your search. Please try again later.</strong>;
  }

  return (
    <div  className="grid-container">
    {
      loading
      ?
      <p>Loading results...</p>
      :
      movies.map( m => 
        <div className="results" onClick={ () => navigate(`/movie/${ m.id }`) } key={m.id}>
          <div>
            <img alt={m.original_title} src={ generateMoviePosterUrl(m) } />
          </div>
          <div> 
            <h3>{ m.title } ({ m.release_date.slice( 0, 4 ) })</h3>
            <p>{ m.overview }</p>
          </div>
        </div>
      )
    }
    </div>
  );

}
export default SearchResults;