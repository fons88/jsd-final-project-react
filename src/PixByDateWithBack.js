import Button from '@mui/material/Button';
import PixByDate from './PixByDate';
import { useParams, useNavigate } from 'react-router-dom';

export default function PixByDateWithBack( props ){
  const params = useParams();
  const navigate = useNavigate();

  const handleClick = () => navigate(`/search/${ params.start }/${ params.end }`);

  return (
    <>
      <Button variant="text" onClick={ handleClick }> Back to Search List</Button>
      <div />
      <PixByDate query={ params.query } updLike={ props.updLike }/>
    </>
  );
}