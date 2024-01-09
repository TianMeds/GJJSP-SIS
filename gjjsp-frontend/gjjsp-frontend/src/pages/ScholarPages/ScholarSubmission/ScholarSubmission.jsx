import React, { useState } from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../../context/theme';
import HistoryIcon from '@mui/icons-material/History';
import useScholarSubmissionStore from '../../../store/ScholarSubmissionStore';
import classNames from 'classnames';

export default function ScholarSubmission() {
  const { submissionStatus, 
    submissionType,
  submissionSent,
submissionDue, } = useScholarSubmissionStore();

  // State for GWA input
  const [gwaValue, setGwaValue] = useState('');

  // Handle GWA input change
  const handleGwaChange = (e) => {
    setGwaValue(e.target.value);
  };

  // Handle form submission (example)
  const handleSubmit = () => {
    // You can add your submission logic here
    console.log('Submitted GWA:', gwaValue);
  };

  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>
            <MUI.Grid item xs={12}>
              <MUI.Box
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'left', md: 'center' }}
                margin={2}
                justifyContent="space-between"
              >
                <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                  Submission
                </MUI.Typography>
                <MUI.Box>
                  {/* Submission History button */}
                  <MUI.Button variant="contained" component={Link} to="" id="addButton" sx={{ mr: 4 }}>
                    <HistoryIcon sx={{ mr: 1 }} />
                    <MUI.Typography variant="body2">Submission history</MUI.Typography>
                  </MUI.Button>
                </MUI.Box>
              </MUI.Box>
            </MUI.Grid>

            <MUI.Grid container item xs={12} md={6} sx={{ marginLeft: 2 }}>
              <MUI.Grid item>
                <MUI.Typography variant="h4" sx={{ color: 'black', fontWeight: 'bold' }}>
                  {submissionType}
                </MUI.Typography>
              </MUI.Grid>
              <MUI.Grid item sx={{ marginLeft: 2 }}>
                <MUI.Typography>
                  <span className={classNames('submissionStatus', submissionStatus)}>{submissionStatus}</span>
                </MUI.Typography>
              </MUI.Grid>
            </MUI.Grid>

            <MUI.Grid container item xs={12} md={6} sx={{ marginLeft: 2 }}>
            <MUI.Grid item xs={6} md={12} mb={2}>
            <MUI.Box mb={2}>
          <MUI.Typography variant='h5'>Due:{" " + submissionDue}</MUI.Typography>
          <br/>
          <MUI.Typography variant='h5'>Submitted:{" " + submissionSent}</MUI.Typography>
        </MUI.Box>

     </MUI.Grid>
              <MUI.Grid item xs={12}>
                <MUI.InputLabel>1. General Weighted Average</MUI.InputLabel>
                
                <MUI.TextField
                  placeholder="Enter GWA this term"
                  fullWidth // Make the text field take up the full width
                  margin="normal" // Adjust spacing as needed
                  value={gwaValue}
                  onChange={handleGwaChange}
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
                <MUI.InputLabel>2. Add remarks about GWA</MUI.InputLabel>
                
                <MUI.TextField
                  placeholder="Add remark"
                  fullWidth // Make the text field take up the full width
                  margin="normal" // Adjust spacing as needed
                  value={gwaValue}
                  onChange={handleGwaChange}
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
          </MUI.Grid>
        </MUI.Container>
      </MUI.ThemeProvider>
    </Layout>
  );
}
