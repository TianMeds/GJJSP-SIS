import React, {useState} from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../../context/theme';
import HistoryIcon from '@mui/icons-material/History';

export default function AlumniSubmission() {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };


  return (
    <Layout>
    <MUI.ThemeProvider theme={theme}>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>
        <MUI.Grid item xs={12}>
          <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
            <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
              Alumni Submission
            </MUI.Typography>
            
            <MUI.Grid sx={{display: 'flex', alignItems: 'center'}} gap={4} xs={6}>
              <MUI.FormControl>
                <MUI.Select
                  native
                  sx={{border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                >
                  <option value="All">SY 2023-2024</option>
                  <option value="New">SY 2022-2023</option>
                  <option value="For Renewal">SY 2021-2022</option>
                </MUI.Select>
              </MUI.FormControl>

            </MUI.Grid>

            {/* Submission History button */}
            <MUI.Button variant="contained" component={Link} to="" id="addButton">
              <HistoryIcon sx={{ mr: 1 }} />
              <MUI.Typography variant="body2">Submission history</MUI.Typography>
            </MUI.Button>

          </MUI.Box>
        </MUI.Grid>


              <MUI.Grid item xs={12}>
                <MUI.Typography variant='h3' sx={{fontWeight: 'bold'}}>
                  Alumni Form
                </MUI.Typography>
              </MUI.Grid>


            <MUI.Grid component="form">
           
              <MUI.Grid container item xs={12} sx={{mt: 5, ml: 2, display: 'flex'}}>

                <MUI.Grid item xs={12}>
                  <MUI.InputLabel id="gwaLabel">1. Current Company Name</MUI.InputLabel>
                  
                  <MUI.TextField
                    placeholder="Enter GWA this term"
                    fullWidth // Make the text field take up the full width
                    margin="normal" // Adjust spacing as needed
                    sx={{
                      background: '#f5f5f5',
                      color: '#00000',
                      marginLeft: 2,
                      height: 'auto',
                      marginBottom: 2,
                    }}
                  />
                </MUI.Grid>

                <MUI.Grid item xs={12}>
                  <MUI.InputLabel id="remarksLabel">2. Current Company Location</MUI.InputLabel>
                  
                  <MUI.TextField
                    placeholder="Add remark"
                    fullWidth // Make the text field take up the full width
                    margin="normal" // Adjust spacing as needed
                    sx={{
                      background: '#f5f5f5',
                      color: '#00000',
                      marginLeft: 2,
                      height: 'auto',
                      marginBottom: 2,
                    }}
                  />
                </MUI.Grid>

                <MUI.Grid item xs={12}>
                  <MUI.InputLabel id="remarksLabel">3. Current Job Position</MUI.InputLabel>
                  
                  <MUI.TextField
                    placeholder="Add remark"
                    fullWidth // Make the text field take up the full width
                    margin="normal" // Adjust spacing as needed
                    sx={{
                      background: '#f5f5f5',
                      color: '#00000',
                      marginLeft: 2,
                      height: 'auto',
                      marginBottom: 2,
                    }}
                  />
                </MUI.Grid>
              </MUI.Grid>

              <MUI.Grid item xs={12} sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}>

                <MUI.Box sx={{ ml: 1 }}>  

                  <MUI.Button variant='contained' sx={{ mb: { xs: 1, sm: 0 } }}>
                    Submit
                  </MUI.Button>


                  <MUI.Button variant='text' sx={{color: '#091E42', ml: { xs: 2, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                    Save for now
                  </MUI.Button>

                </MUI.Box>

              </MUI.Grid>

            </MUI.Grid>
        </MUI.Grid>
      </MUI.Container>
    </MUI.ThemeProvider>
  </Layout>


  )
}
