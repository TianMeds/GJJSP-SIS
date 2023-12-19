import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';  
import { useState } from 'react';
import useExportStore from '../Store/ExportStore';

export default function Export() {


  const {
    exportData,
    handleOpenExport,
    handleCloseExport,
  } = useExportStore();

  const [selectedOption, setSelectedOption] = useState('');

  const handleClickFirst = (event) => {
    setAnchorElFirst(event.currentTarget);
  };

  const handleCloseFirst = () => {
    setAnchorElFirst(null);
  };

  const handleClickSecond = (event) => {
    setAnchorElSecond(event.currentTarget);
  };

  const handleCloseSecond = () => {
    setAnchorElSecond(null);
  };

  return (
    <Layout>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem', mb: 2 }}>Export</MUI.Typography>
                      
            {/* Add User Button */}
            <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none', width: {xs: '100px', md: '200px'}, whiteSpace: 'nowrap' }}>
              Export now
            </MUI.Button>
          </MUI.Box>
        </MUI.Grid>

        <MUI.Container sx={{ display: 'flex', alignItems: 'center' }}>
          <MUI.Typography sx={{m: 3}}>Schedule</MUI.Typography>

          <MUI.FormControl sx={{ width: '180px', border: '2px solid #032539', borderRadius: '8px' }}>
          <MUI.Select displayEmpty 
            value={selectedOption}
          >
              <MUI.MenuItem value="" disabled> Choose a Schedule </MUI.MenuItem>
              <MUI.MenuItem value="Daily">Daily</MUI.MenuItem>
              <MUI.MenuItem value="Weekly">Weekly</MUI.MenuItem>
              <MUI.MenuItem value="Monthly">Monthly</MUI.MenuItem>
              <MUI.MenuItem value="Quarterly">Quarterly</MUI.MenuItem>
              <MUI.MenuItem value="Yearly">Yearly</MUI.MenuItem>
            </MUI.Select>
          </MUI.FormControl>
        
        </MUI.Container>

        <MUI.Grid item xs={12}>
          <MUI.Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            margin={2}
          >
            {/* Typography */}
            <MUI.Typography variant="h1" sx={{fontSize: '1.3rem', mb: { xs: 2, sm: 0 }, marginLeft: 1 }}>
              Export includes
            </MUI.Typography>
          </MUI.Box>

          <MUI.Grid container direction="column" spacing={1} sx={{marginLeft: 2}}>
            <MUI.Grid item>
              <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="All user data" />
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="My account details" />
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="All scholarships , schools, notifications, and submissions data" />
            </MUI.Grid>
            <MUI.Grid item>
              <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="All  Scholars, and Submission data" />
            </MUI.Grid>
          </MUI.Grid>

          <MUI.Box display="flex" gap={1} margin={2} justifyContent="flex-end" sx={{width: {xs: '150px', md: '500px'}}}>
              <MUI.Button variant="text" color="primary" sx={{ textTransform: 'none', width: { xs: '80px', md: '100px' }, whiteSpace: 'nowrap' }}>
                Clear
              </MUI.Button>
              <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none', width: { xs: '80px', md: '100px' }, whiteSpace: 'nowrap' }} onClick={handleOpenExport}>
                Confirm
              </MUI.Button>
          </MUI.Box>
        </MUI.Grid>

        <MUI.Dialog  open={exportData} onClose={handleCloseExport} fullWidth maxWidth="xs">
          <MUI.Grid sx={{paddingTop: 2, paddingLeft: 0}}>
          <MUI.DialogTitle sx={{fontWeight: 'bold'}}>Request data export - are you sure?</MUI.DialogTitle>
          <MUI.DialogContent sx={{display: 'flex',flexDirection: 'column'}}>
            <MUI.Typography variant='body2'>Export includes</MUI.Typography>
              <MUI.Grid sx={{display: 'flex',flexDirection: 'column', m: '20px 0px'}}>
                <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="All user data" />
                <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="My account details" />
                <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="All scholarships, schools, notifications, and submissions data" sx={{mb: 1}} />
                <MUI.FormControlLabel control={<MUI.Checkbox defaultChecked />} label="All  Scholars, and Submission data"  sx={{mb: 1}}/>
              </MUI.Grid>
            <MUI.Typography variant='body2'>To proceed, click "Confirm export" below</MUI.Typography>
          </MUI.DialogContent>
          <MUI.DialogActions sx={{m: 2}}>
            <MUI.Button sx={{textTransform: 'capitalize'}} onClick={handleCloseExport}>Cancel</MUI.Button>
            <MUI.Button sx={{textTransform: 'capitalize', borderRadius: '10px'}} variant='contained' onClick="" >Confirm Export</MUI.Button>
          </MUI.DialogActions>
          </MUI.Grid>
        </MUI.Dialog>

      </MUI.Grid>
    </MUI.Container>
  </Layout>
  )
}
