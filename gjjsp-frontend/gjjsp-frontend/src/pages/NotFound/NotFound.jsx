import React from 'react'
import * as MUI from '../../import';
import './NotFound.css';
import { Link } from 'react-router-dom';


export default function NotFound() {


  return (

    <MUI.Container id='container'>
        <MUI.Box className='fof-images'>
            <img src="https://raw.githubusercontent.com/acb123web/404-Page-Design/main/img/404main.jpg" alt="" className="fof-image1"/>
            <MUI.Grid className="swing">
            <img src="https://raw.githubusercontent.com/acb123web/404-Page-Design/main/img/board.png" alt="" className="fof-image2"/>
          </MUI.Grid>
        </MUI.Box>
        <MUI.Typography variant="body1" id="notFoundTitle">PAGE NOT FOUND</MUI.Typography>
        <MUI.Typography variant="body1" id="notFoundDescription"> The Page you are looking night have been removed<br/>
        or temparorily unavailable.</MUI.Typography> 
        <MUI.Button id="home-btn" variant="contained" color="primary" component={Link} to="/login"><i class="fa-solid fa-house-chimney"></i> Go to Login</MUI.Button>
    </MUI.Container>

  )
}
