import React from 'react'
import * as MUI from '../../import'

import BGIMG1 from '../../../src/assets/BGIMG1.jpg';
import BGIMG2 from '../../../src/assets/BGIMG2.jpg';
import BGIMG3 from '../../../src/assets/BGIMG3.jpg';
import BGIMG4 from '../../../src/assets/BGIMG4.jpg';
import BGIMG5 from '../../../src/assets/BGIMG5.jpg';
import BGIMG6 from '../../../src/assets/BGIMG6.jpg';
import BGIMG7 from '../../../src/assets/BGIMG7.jpg';
import BGIMG8 from '../../../src/assets/BGIMG8.jpg';
import BGIMG9 from '../../../src/assets/BGIMG9.jpg';
import BGIMG10 from '../../../src/assets/BGIMG10.jpg';


 const LeftGrid = () => {
    {/* When its size to a Tablet mode the Left Grid display none  */}
    const isMobile = MUI.useMediaQuery('(max-width:768px)');

    const images = [BGIMG1, BGIMG2, BGIMG3, BGIMG4, BGIMG5, BGIMG6, BGIMG7, BGIMG8, BGIMG9, BGIMG10];

const carouselSettings = {
  showArrows: false,
  showStatus: false,
  showIndicators: false,
  infiniteLoop: true,
  autoPlay: true,
  interval: 3000,
};


  return (
    <>
    <MUI.CssBaseline />
      {!isMobile && (
        <MUI.Grid
          container 
          alignItems='center' 
          justifyContent='center'
          item
          xs={false}
          sm={12}
          md={7}
          sx={{
              display: 'flex', // Use flex container
              flexDirection: 'column', // Stack items vertically
              alignItems: 'center', // Center items horizontally
              justifyContent: 'center', // Center items vertically
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BGIMG1})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'center',
              padding: '2rem', // Add padding to the content
            }}
        >
          <br />
          <MUI.Typography variant="h1" color="background.paper" paragraph>
            Welcome to Gado and Jess <br/> Jalandoni Scholarship Program
          </MUI.Typography>
          <MUI.Typography variant="h4" color="background.paper" paragraph>
            Empowering dreams through education.
          </MUI.Typography>
        </MUI.Grid>
      )}
    </>
  )
}

export default LeftGrid;
