import React from 'react'
import * as MUI from '../../import'
import BGIMG from '../../assets/SchoolBG1.jpg';


export const LeftGrid = () => {
    {/* When its size to a Tablet mode the Left Grid display none  */}
    const isMobile = MUI.useMediaQuery('(max-width:768px)');

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
              backgroundImage: `url(${BGIMG})`,
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
