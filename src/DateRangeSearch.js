
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Box from '@mui/material/Box';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

export default function DateRangeSearch() {

  const [ startDate, setStartDate ] = useState( '' );
  const [ endDate, setEndDate ] = useState( '' );

  // function handleSubmit( ev ){
  //   ev.preventDefault(); // prevent page reload
  
  //   const m = parseInt( searchDate.$M ) + 1;
  //   const d = parseInt( searchDate.$D );
    
  //   navigate(`/search/${ searchDate.$y }-${ m < 10 ? '0' + m : m }-${ d < 10 ? '0' + d : d }`);
  // }

  return (
    <Box
      component="form"
      // onSubmit={ handleSubmit }
      sx={{ '& > :not(style)': { m: 0.5, width: '100ch' },}}
      noValidate
      autoComplete="off"
    >
      <Stack direction="row" spacing={1}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DatePicker id="start" label="start date" slotProps={{ textField: { size: 'small' } }} onChange={ newDate => setStartDate( newDate )} /> &nbsp;&nbsp;_
          <DatePicker id="end" label="end date" slotProps={{ textField: { size: 'small' } }} onChange={ newDate => setEndDate( newDate )} />
        </LocalizationProvider>
        <Button variant="outlined" size="large">Search</Button>
      </Stack>
    </Box>
  );

  // return (
  //   <Box
  //     component="form"
  //     // onSubmit={ handleSubmit }
  //     sx={{ '& > :not(style)': { m: 0.5, width: '100ch' },}}
  //     noValidate
  //     autoComplete="off"
  //   >
  //     <Stack direction="row" spacing={2}>
  //       <LocalizationProvider dateAdapter={AdapterDayjs}>
  //           <DateRangePicker slotProps={{ textField: { fullWidth: false } }} />
  //       </LocalizationProvider>
  //       <Button variant="outlined" size="large">Search</Button>
  //     </Stack>
  //   </Box>
  // );

  // return (
  //   <Stack direction="row" spacing={2}>
  //     <LocalizationProvider dateAdapter={AdapterDayjs}>
  //         <DateRangePicker slotProps={{ textField: { fullWidth: false } }} />
  //     </LocalizationProvider>
  //     <Button variant="outlined" size="large">Search</Button>
  //   </Stack>
  // );
}