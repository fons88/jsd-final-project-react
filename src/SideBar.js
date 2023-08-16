import { Route, Routes, HashRouter as Router, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';


function SideBar(){

  const navigate = useNavigate();

  return(
    <nav>
      <Box sx={{ width: '200%' }}>
        <Stack spacing={3}>
          <Button />
          <Link to="/"><Button variant="text">Home</Button></Link>
          <Link to="/"><Button variant="text">Asteroids News</Button></Link>
          <Link to="/"><Button variant="text">Favourites</Button></Link>
        </Stack>
      </Box>
    </nav>

  )

  // return (
  //   <Sidebar>
  //     <Menu>
  //       <nav>
  //         <h1></h1>
  //         <MenuItem>
  //           <Link to ="/"><Button variant="text">Search Pix by Date</Button></Link>
  //         </MenuItem>
  //         <MenuItem><Button variant="text">Search Range of Dates</Button></MenuItem>
  //         <MenuItem><Button variant="text">Asteroids News </Button></MenuItem>
  //         <MenuItem><Button variant="text">Favourites</Button></MenuItem>
  //       </nav>
  //     </Menu>
  //   </Sidebar>
  // )
}

export default SideBar;