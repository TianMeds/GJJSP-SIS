import React from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Link } from 'react-router-dom';
import useSubmissionStore from '../../store/SubmissionStore';
import StatusProgress from '../Components/StatusProgress';
import classNames from 'classnames';


export default function ViewSubmission() {

    const {
        submission,
        scholarshipType,
        submissionType,
        submissionSent,
        submissionStatus,
        attachmentOpen,
        setAttachmentOpen,
        submissionFormOpen,
        setSubmissionFormOpen,
        submissionStatusOpen,
        setSubmissionStatusOpen,
        submissionManage,
        setSubmissionManage,
        setSubmission,
    } = useSubmissionStore();
    
    const handleAttachmentOpen = () => {
      setAttachmentOpen(!attachmentOpen);
    }

    const handleSubmissionFormOpen = () => {
      setSubmissionFormOpen(!submissionFormOpen);
    }

    const handleOpenSubmission = (type) => {
      setSubmission(true);
      if (type === 'approval')
      {
        setSubmissionManage('approval');
      }
      else{
        setSubmissionManage('disapproval');
      }
        
    };

    const handleCloseSubmission = () => {
      setSubmission(false);
      setSubmissionManage('');
    };

    const handleStatusOpen = () => {
      setSubmissionStatusOpen(!submissionStatusOpen);
    }

    const handleApproveSubmission = () => {
      setSubmissionManage('approval'); // Set the submission type to 'approval'
      handleCloseSubmission();
    };
  
    const handleDisapproveSubmission = () => {
      setSubmissionManage('disapproval'); // Set the submission type to 'disapproval'
      handleCloseSubmission();
    };

    const numOfDividers = 3;

    const statuses = [
      { labelStatus: submissionStatus  + ' by:',  numOfDividers: 3 },
      { labelStatus: 'Respond: ' +  submissionType, numOfDividers: 3},
      { labelStatus: 'Submitted by: '},
      // Add more statuses as needed
    ]

  return (
    <Layout>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <MUI.Grid container spacing={3}>

            <MUI.Grid item xs={12}>
                <MUI.Box display="flex" flexDirection='row' alignItems="center" >
                
                    <MUI.IconButton component={Link} to="/submission">
                        <MUI.KeyboardBackspaceIcon/>  
                    </MUI.IconButton>
                    <MUI.Typography sx={{margin: 2}}>Back to Submission</MUI.Typography>
                
                </MUI.Box>
            </MUI.Grid> 
            
            <MUI.Grid container spacing={3}>
              {/* Left side content */}
              <MUI.Grid item xs={12} md={8}>
                <MUI.Box  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Adjusts layout for different screen sizes
                    alignItems: { xs: 'flex-start', md: 'center' }, // Aligns items differently for mobile and larger screens
                    marginLeft: 5, // Adjust the margin for better spacing on mobile
                  }}
                >
                  {/* Left side - Icon */}
                  <MUI.DescriptionOutlinedIcon   sx={{fontSize: { xs: '40px', md: '50px' }, color: '#022ff8', display: {xs: 'none', md: 'flex'} }}/>

                  {/* Middle section - Submission and Details */}
                  <MUI.Box  sx={{ marginLeft: { xs: 2, md: 2 }, marginTop: { xs: 2, md: 0 } }}>
                    <MUI.Typography variant="h4" sx={{fontWeight: 'bold'}}>Submissions</MUI.Typography>
                    <MUI.Typography variant="body2" sx={{ marginTop: 1 }}>Submission Details</MUI.Typography>
                  </MUI.Box>

                  {/* Right side - Approve and Disapprove buttons */}
                  <MUI.Box sx={{ margin: { xs: 2, md: 'auto' }, marginTop: { xs: 2, md: 0 }, display: 'flex', flexDirection: 'row'}}>
                    <MUI.Button variant='contained' sx={{marginRight: 2}} onClick={() => handleOpenSubmission('approval')} >Approve</MUI.Button>
                    <MUI.Button variant='outlined' onClick={() => handleOpenSubmission('dissapproval')}>Disapprove</MUI.Button>
                  </MUI.Box>
                </MUI.Box>
              </MUI.Grid>
            </MUI.Grid>

            <MUI.Grid item xs={12} md={6} sx={{marginLeft: 3}}>

              <MUI.Grid>
                <MUI.Typography>
                  <span className={classNames('submissionStatus', submissionStatus)}>{submissionStatus}</span>
                </MUI.Typography> 
              </MUI.Grid>

                      <MUI.Box sx={{ 
                        display: 'flex',
                        flexDirection: {xs: 'column', md: 'row'},
                        alignItems: {xs: 'left', md: 'center'},
                        justifyContent: 'space-between',
                        width: '600px',
                        mt: 2,
                        }}
                        >

                        <MUI.Avatar sx={{ width: 50, height: 50, marginBottom: 2 }}>CM</MUI.Avatar>

                        <MUI.Typography variant="h4" gutterBottom sx={{fontWeight: 'bold', fontSize: {xs: '1rem', md: '2rem'}}} >
                          Christian Medallada
                        </MUI.Typography>
                        
                        <MUI.Button sx={{color: '#0cc6e4', fontWeight: 'bold', marginRight: {xs: 2, md: 8}, width: {xs: '8rem'}}}>View Profile</MUI.Button>
                      </MUI.Box>
                </MUI.Grid>
            </MUI.Grid>


            <MUI.Box sx={{
              padding: 4,
              display: 'flex',
              flexDirection: {xs: 'column', md: 'row'},
              maxWidth: {xs: '400px', md: '650px'},
              width: '100%',
              border: '1px solid #bdbdbd',
              boxShadow: '9px 24px 17px -3px rgba(0,0,0,0.1)',
              borderRadius: '5px',
              margin: 2,
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

            <MUI.Grid container spacing={2}>
              <MUI.Grid item xs={12} md={8}></MUI.Grid>
                <MUI.Grid item xs={12} md={4}>

                <MUI.Grid item sx={{ 
                  marginBottom: 2, 
                  alignItems: 'center', 
                  display: 'flex', 
                  marginTop: '-400px', 
                  '@media (max-width:1024px)': {
                    marginTop: 0,
                  },

                  }}>
                    <MUI.IconButton onClick={handleStatusOpen}>
                    {submissionStatusOpen ? <MUI.ExpandLessIcon /> : <MUI.ExpandMoreIcon />}
                    </MUI.IconButton>
                    <MUI.Typography style={{ marginLeft: '5px' }}>Status: {submissionStatus}</MUI.Typography>
                  </MUI.Grid>

                  <MUI.Collapse in={submissionStatusOpen} timeout="auto" unmountOnExit>
                  <MUI.Grid
                    container
                    sx={{
                      flexDirection:'column'
                    }}
                  >
                    <StatusProgress statuses={statuses} />
                  </MUI.Grid>

                  </MUI.Collapse>

                  <MUI.Grid item sx={{ marginTop: 'auto', marginLeft: '20px' }}>
                  <MUI.Divider />
                  <MUI.Grid container alignItems="center" flexDirection='row' sx={{ marginTop: 2, marginBottom: 2 }}>
                    <MUI.InsertCommentOutlinedIcon />
                    <MUI.Typography sx={{ marginLeft: 2 }}>Remarks</MUI.Typography>
                  </MUI.Grid>
                  <MUI.TextField
                    placeholder='Add Remark'
                    sx={{
                      background: '#f5f5f5',
                      color: '#00000',
                      marginLeft: 2,
                      height: 'auto',
                      marginBottom: 2
                    }}
                  />
                </MUI.Grid>

                </MUI.Grid>
                

                <MUI.Grid item xs={12} md={4}>
                  <MUI.Grid item sx={{ marginBottom: 2, alignItems: 'center' , display: 'flex'}}>
                    <MUI.IconButton onClick={handleAttachmentOpen}>
                    {attachmentOpen ? <MUI.ExpandLessIcon /> : <MUI.ExpandMoreIcon />}
                    </MUI.IconButton>
                    <MUI.Typography style={{ marginLeft: '5px' }}>Attachment: </MUI.Typography>
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
                  <MUI.Grid item sx={{ marginBottom: 2, alignItems: 'center' , display: 'flex'}}>
                    <MUI.IconButton onClick={handleSubmissionFormOpen}>
                      {submissionFormOpen ? <MUI.ExpandLessIcon /> : <MUI.ExpandMoreIcon />}
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

            </MUI.Grid>


          <MUI.Dialog open={submissionManage !== ''} onClose={handleCloseSubmission} fullWidth maxWidth="xs">
            <MUI.DialogContent>
            <MUI.Typography sx={{display: 'flex', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold', margin: '12px 0'}}> 
                <MUI.InfoIcon sx={{color: '#D97706', mr: 1}}/>
                {submissionManage === 'approval' ? 'Submission Approval Confirmation' : 'Reason for Disapproval'}
              </MUI.Typography>
            <MUI.Typography sx={{color: '#44546F', fontSize: '0.9rem'}}>
              {submissionManage === 'approval' 
                ? 'Are you sure you want to approve this submission?'
                : 'Specify the reason for disapproving this submission:'
              }
            </MUI.Typography>

            {submissionManage === 'disapproval' && (
              <MUI.FormControl sx={{ width: '100%', borderRadius: '8px' }}>
                <MUI.Select native>
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Wrong Documents">Wrong Documents</option>
                  <option value="Lack of Documents">Lack of Documents</option>
                </MUI.Select>
              </MUI.FormControl>
            )}
            </MUI.DialogContent>
            <MUI.DialogActions>
              <MUI.Button onClick={handleCloseSubmission}>Cancel</MUI.Button>
              {submissionManage === 'approval' ? (
                <MUI.Button onClick={handleApproveSubmission} variant="contained">
                  Confirm Approval
                </MUI.Button>
              ) : (
                <MUI.Button onClick={handleDisapproveSubmission} variant="contained">
                  Confirm Disapproval
                </MUI.Button>
              )}
            </MUI.DialogActions>
          </MUI.Dialog>
    </MUI.Container>
  
    </Layout>
  )
}
