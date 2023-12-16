import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Link } from 'react-router-dom';
import useSubmissionStore from '../Store/SubmissionStore';
import faker from 'faker';
import classNames from 'classnames';


export default function ViewSubmission() {


    const {
        scholarshipType,
        submissionType,
        submissionSent,
        submissionStatus,
        attachmentOpen,
        setAttachmentOpen,
        submissionFormOpen,
        setSubmissionFormOpen,
    } = useSubmissionStore();
    
    const handleAttachmentOpen = () => {
      setAttachmentOpen(!attachmentOpen);
    }

    const handleSubmissionFormOpen = () => {
      setSubmissionFormOpen(!submissionFormOpen);
    }


  return (
    <Layout>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>

            <MUI.Grid item xs={12}>
                <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" >
                
                    <MUI.IconButton component={Link} to="/submission">
                        <MUI.KeyboardBackspaceIcon/>  
                    </MUI.IconButton>
                    <MUI.Typography sx={{margin: 3}}>Back to Submission</MUI.Typography>
                
                </MUI.Box>
            </MUI.Grid> 
            
          <MUI.Grid item xs={12} md={8}>

          <MUI.Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Left side - Icon */}
      <MUI.DescriptionOutlinedIcon  sx={{fontSize: '50px', color: '#022ff8'}}/>

      {/* Middle section - Submission and Details */}
      <MUI.Box sx={{ marginLeft: 2 }}>
        <MUI.Typography variant="h4" sx={{fontWeight: 'bold'}}>Submissions</MUI.Typography>
        <MUI.Typography variant="body2" sx={{ marginTop: 1 }}>Submission Details</MUI.Typography>
      </MUI.Box>

      {/* Right side - Approve and Disapprove buttons */}
      <MUI.Box sx={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
        <MUI.Button variant='contained' sx={{marginRight: 1}} >Approve</MUI.Button>
        <MUI.Button variant='outlined'>Disapprove</MUI.Button>
      </MUI.Box>
    </MUI.Box>


      <MUI.Grid item xs={12} md={6}>

        <MUI.Grid sx={{mt: 5}}>
          <MUI.Typography>
            <span className={classNames('submissionStatus', submissionStatus)}>{submissionStatus}</span>
          </MUI.Typography> 
            </MUI.Grid>

                <MUI.Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '600px',
                  mt: 2,
                  }}
                  >

                  <MUI.Avatar sx={{ width: 50, height: 50, marginBottom: 2 }}>CM</MUI.Avatar>

                  <MUI.Typography variant="h4" gutterBottom sx={{fontWeight: 'bold',  whiteSpace: 'nowrap'}} >
                    Christian Medallada
                  </MUI.Typography>
                  
                  <MUI.Button sx={{color: '#0cc6e4', fontWeight: 'bold', marginRight: 8}}>View Profile</MUI.Button>
                </MUI.Box>
            </MUI.Grid>
        </MUI.Grid>


        <MUI.Box sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'row',
          maxWidth: '650px',
          width: '100%',
          border: '1px solid #bdbdbd',
          boxShadow: '9px 24px 17px -3px rgba(0,0,0,0.1)',
          borderRadius: '5px',
          margin: 5,
        }}
        >
          <MUI.Box sx={{ flex: 1 }} >
            <MUI.Typography variant="body1" fontWeight="bold">
              Scholarship Type:
            </MUI.Typography>
            <MUI.Typography>{scholarshipType}</MUI.Typography>
          </MUI.Box>
          <MUI.Box sx={{ flex: 1 }}>
            <MUI.Typography variant="body1" fontWeight="bold">
              Submission:
            </MUI.Typography>
            <MUI.Typography>{submissionType}</MUI.Typography>
          </MUI.Box>
          <MUI.Box sx={{ flex: 1 }}>
            <MUI.Typography variant="body1" fontWeight="bold">
              Submitted:
            </MUI.Typography>
            <MUI.Typography>{submissionSent}</MUI.Typography>
          </MUI.Box>
        </MUI.Box>

      </MUI.Grid>

      <MUI.Grid item xs={12} md={4}>
        <MUI.Grid style={{ display: 'flex', alignItems: 'center' }}>
          <MUI.IconButton onClick={handleAttachmentOpen}>
            <MUI.ExpandMoreIcon />
          </MUI.IconButton>
          <MUI.Typography style={{ marginLeft: '5px' }}>Attachment</MUI.Typography>
        </MUI.Grid>

        <MUI.Collapse in={attachmentOpen} timeout="auto" unmountOnExit>
          <MUI.List disablePadding>
            <MUI.ListItemButton sx={{ pl: 4 }}>
              <MUI.ListItemIcon>
                <MUI.DescriptionOutlinedIcon />
              </MUI.ListItemIcon>
              <MUI.ListItemText primary="BRGY_CERT_MEDALLADA.PDF" />
            </MUI.ListItemButton>
            <MUI.ListItemButton sx={{ pl: 4 }}>
              <MUI.ListItemIcon>
                <MUI.DescriptionOutlinedIcon />
              </MUI.ListItemIcon>
              <MUI.ListItemText primary="BRGY_CERT_MEDALLADA.PDF" />
            </MUI.ListItemButton>
            <MUI.ListItemButton sx={{ pl: 4 }}>
              <MUI.ListItemIcon>
                <MUI.DescriptionOutlinedIcon />
              </MUI.ListItemIcon>
              <MUI.ListItemText primary="BRGY_CERT_MEDALLADA.PDF" />
            </MUI.ListItemButton>
          </MUI.List>
        </MUI.Collapse>

      </MUI.Grid>

      <MUI.Grid item xs={12} md={4}>
        <MUI.Grid style={{ display: 'flex', alignItems: 'center' }}>
          <MUI.IconButton onClick={handleSubmissionFormOpen}>
            <MUI.ExpandMoreIcon />
          </MUI.IconButton>
          <MUI.Typography style={{ marginLeft: '5px' }}>Form: Renewal of Application</MUI.Typography>
        </MUI.Grid>


        <MUI.Collapse in={submissionFormOpen} timeout="auto" unmountOnExit>
        <MUI.Grid container spacing={2} style={{ marginTop: '10px', paddingLeft: '30px' }}>
          <MUI.Grid item xs={12}>
            <MUI.InputLabel>1. General Weighted Average</MUI.InputLabel> 
            <br/>
            <MUI.Paper elevation={3} style={{ background: '#f0f0f0', padding: '10px', marginLeft: '20px',  pointerEvents: 'none', userSelect: 'none', color: '#616161' }}>
              <MUI.Typography>
                4.0
              </MUI.Typography>
            </MUI.Paper>
          </MUI.Grid>

          <MUI.Grid item xs={12}>
            <MUI.InputLabel>2. Add remarks about GWA</MUI.InputLabel>
            <br/>
            <MUI.Paper elevation={3} style={{ background: '#f0f0f0', padding: '10px', marginLeft: '20px',  pointerEvents: 'none', userSelect: 'none', color: '#616161' }}>
              <MUI.Typography>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien    fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit.
              </MUI.Typography>
            </MUI.Paper>
          </MUI.Grid>
        </MUI.Grid>

        </MUI.Collapse>

      </MUI.Grid>

    </MUI.Container>
    </Layout>
  )
}
