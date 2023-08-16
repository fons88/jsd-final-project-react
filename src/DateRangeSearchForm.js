
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateRangeSearchForm() {

  const navigate = useNavigate();

  const [ startDate, setStartDate ] = useState( '' );
  const [ endDate, setEndDate ] = useState( '' );
  const [ error, setError ] = useState( false );

  function handleSubmit(ev){
    if
    (
      startDate.$y > endDate.$y ||
      ( startDate.$y === endDate.$y && startDate.$M > endDate.$M ) ||
      ( startDate.$y === endDate.$y && startDate.$M === endDate.$M && startDate.$D > endDate.$D )
    ){
      console.log ('start date after end date');
      setError(true);
      return;
    }

    ev.preventDefault();
    const mSt = parseInt( startDate.$M ) + 1;
    const dSt = parseInt( startDate.$D );
    const mEnd = parseInt( endDate.$M ) + 1;
    const dEnd = parseInt( endDate.$D );
    
    navigate(`/search/${ startDate.$y }-${ mSt < 10 ? '0' + mSt : mSt }-${ dSt < 10 ? '0' + dSt : dSt }/${ endDate.$y }-${ mEnd < 10 ? '0' + mEnd : mEnd }-${ dEnd < 10 ? '0' + dEnd : dEnd }`);
  }

  if( error ) {
    setError(false);
    return <strong>End date has to be after start date.</strong>;

  }

  return (
    <Box
      component="form"
      onSubmit={ handleSubmit }
      sx={{ '& > :not(style)': { m: 0.5, width: '100ch' },}}
      noValidate
      autoComplete="off"
    >
      <Stack direction="row" spacing={1}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker id="start" label="start date" slotProps={{ textField: { size: 'small' } }} onChange={ newDate => setStartDate( newDate )} /> &nbsp;&nbsp;_
          <DatePicker id="end" label="end date" slotProps={{ textField: { size: 'small' } }} onChange={ newDate => setEndDate( newDate )} />
        </LocalizationProvider>
        <Button variant="outlined" size="large" onClick={ handleSubmit }>Search</Button>
      </Stack>
    </Box>
  );
}