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
    } = useSubmissionStore();
    

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
    </MUI.Container>
    </Layout>
  )
}
