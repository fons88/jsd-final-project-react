import { useNavigate } from 'react-router-dom';

export default function FavouritesList( props ){

  const navigate = useNavigate();
  console.log( 'props', props );
  console.log( 'props.list', props.list );

  return (
    <div className="apod">
      <h3>Favourites List</h3>
    {
      props.list.map( l => 
        <div onClick={ () => navigate(`/search/${ l.date }`) } key={l.date}>{ l.date } - { l.title }</div>
      )
    }
    </div>
  );
}