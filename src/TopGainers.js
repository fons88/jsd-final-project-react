//import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function get4DecimalsFormat ( num ) {
  return parseFloat(num).toFixed(4);
  // Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(parseFloat( num ));
}

function setNumFormat ( num ) {
  return Intl.NumberFormat('en-US').format(parseInt( num ));
}

export default function TopGainers( props ) {
  console.log ('Prop Top Gainers: ', props )
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Ticker</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Price Change</StyledTableCell>
            <StyledTableCell align="right">Change %</StyledTableCell>
            <StyledTableCell align="right">Volume</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataObject.map((p) => (
            <StyledTableRow key={p.ticker}>
              <StyledTableCell component="th" scope="row">
                {p.ticker}
              </StyledTableCell>
              <StyledTableCell align="right">$ { get4DecimalsFormat( p.price ) }</StyledTableCell>
              <StyledTableCell align="right">$ { get4DecimalsFormat( p.change_amount ) }</StyledTableCell>
              <StyledTableCell align="right">{ p.change_percentage } </StyledTableCell>
              <StyledTableCell align="right">{ setNumFormat( p.volume ) }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}