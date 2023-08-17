import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'dayjs/locale/en-gb';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DateSearchForm( props ){
  const [ searchText, setSearchText ] = useState( '' );
  const [ searchDate, setSearchDate ] = useState( '' );
  const navigate = useNavigate();

  function handleSubmit( ev ){
    ev.preventDefault(); // prevent page reload
  
    const m = parseInt( searchDate.$M ) + 1;
    const d = parseInt( searchDate.$D );

    let date = '';

    // only assign value if searchDate is not null
    if( searchDate ){
      date = `${ searchDate.$y}-${ m < 10 ? '0' + m : m }-${ d < 10 ? '0' + d : d }`;
    }
    // console.log('single date:', date);
    
    // navigate(`/search/${ searchDate.$y }-${ m < 10 ? '0' + m : m }-${ d < 10 ? '0' + d : d }`);

    navigate(`/search/${ date }`);
  }

  return (
      <Box
        component="form"
        onSubmit={ handleSubmit }
        sx={{ '& > :not(style)': { m: 0.5 , width: '25ch' },}}
        noValidate
        autoComplete="off"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker id="byDate" label="date" slotProps={{ textField: { size: 'small' } }} onChange={ newDate => setSearchDate( newDate )} />
        </LocalizationProvider>
        <Button variant="outlined" size="large" onClick={ handleSubmit }>Search</Button>
      </Box>
  );
}

export default DateSearchForm;