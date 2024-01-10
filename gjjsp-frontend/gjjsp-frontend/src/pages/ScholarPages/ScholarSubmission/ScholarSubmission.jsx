import React, { useState } from 'react';
import * as MUI from '../../../import';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import theme from '../../../context/theme';
import useSubmissionStore from '../../../store/SubmissionStore';
import HistoryIcon from '@mui/icons-material/History';
import classNames from 'classnames';
import axios from '../../../api/axios';

export default function ScholarSubmission(props) {
  const { submissionStatus, submissionType, submissionSent,attachmentOpen, setAttachmentOpen, file, setFile, setSubmissions } = useSubmissionStore();

  const handleFileChange = (file) => {
    setFile(file[0]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('documents', file);

    await axios.post('/api/submissions', formData)
      .then((res) => {
        console.log(res);
        setSubmissions(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }
  const handleAttachmentOpen = () => {
    setAttachmentOpen(!attachmentOpen);
  }
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


  //Post submission File
  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                <MUI.Typography variant="h1" id="tabsTitle" sx={{ color: 'black' }}>
                  Submission
                </MUI.Typography>

                {/* Submission History button */}
                <MUI.Button variant="contained" component={Link} to="" id="addButton">
                  <HistoryIcon sx={{ mr: 1 }} />
                  <MUI.Typography variant="body2">Submission history</MUI.Typography>
                </MUI.Button>

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
                <MUI.Typography variant='h5'>Due: Today </MUI.Typography>
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

          <MUI.Grid item xs={12} component="form" onSubmit={onSubmit} method='post' encType='multipart/form-data'>
            <MUI.Grid item sx={{ marginBottom: 2, alignItems: 'center' , display: 'flex'}}>
              <MUI.IconButton onClick={handleAttachmentOpen}>
              {attachmentOpen ? <MUI.ExpandLessIcon /> : <MUI.ExpandMoreIcon />}
              </MUI.IconButton>
              <MUI.Typography style={{ marginLeft: '5px' }}>Attachment: </MUI.Typography>
            </MUI.Grid>

            <MUI.Collapse in={attachmentOpen} timeout="auto" unmountOnExit>
            <MUI.Table  sx={{width: '500px', ml: 5}}>
              <MUI.TableBody>
                <MUI.TableRow >
                  <MUI.TableCell >Application Form</MUI.TableCell>
                  <MUI.TableCell >
                    <label htmlFor='documments'>
                      <input type="file" name="documents" id="documents" onChange={(e) => handleFileChange(e.target.files)} style={{ width: '100%' }} />
                    </label>
                  </MUI.TableCell>
                </MUI.TableRow>
                {/* Add more rows as needed */}
              </MUI.TableBody>
            </MUI.Table>
            </MUI.Collapse>

            <MUI.Grid item xs={4} sx={{mt: 3}}>
              <MUI.Box sx={{ ml: 1 }}>
                <MUI.Button variant='contained' sx={{ backgroundColor: '#FFFFFF', color: '#091E42', mr: { xs: 2, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                  Submit Later
                </MUI.Button>
                <MUI.Button variant='contained' type="submit" onClick={onSubmit} sx={{ mb: { xs: 1, sm: 0 } }}>
                  Submit Now
                </MUI.Button>
              </MUI.Box>
            </MUI.Grid>
            
          </MUI.Grid>
          
          </MUI.Grid>
        </MUI.Container>
      </MUI.ThemeProvider>
    </Layout>
  );
}
