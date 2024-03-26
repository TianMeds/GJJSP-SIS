import React, {useEffect, useState}  from 'react'
import {Link, useNavigate } from 'react-router-dom';


//Components 
import EditProfileDialog from '../../../component/Layout/Dialog/EditProfileDialog';
import Layout from '../../../component/Layout/SidebarNavbar/Layout';
import useAuthStore from '../../../store/AuthStore';
import LogoImg from '../../../assets/Scholarlink Logo (40 x 40 px).svg'
import theme from '../../../context/theme';
import * as MUI from '../../../import';
import useDashboardStore from '../../../store/DashboardStore';
import axios from '../../../api/axios';



export default function ScholarDashboard() {

  const navigate = useNavigate();
  
  const {getAuthToken, alertOpen, alertMessage, setAlertMessage, setAlertOpen, errorOpen, errorMessage, setErrorMessage, setErrorOpen, setOpenDialog, setOpenPrivacyDialog} = useAuthStore();
  const [buttonClicked, setButtonClicked] = useState(false);
  const {schoolsData, setSchoolsData, undergraduateData, setUndergraduateData, renewalData, setRenewalData, graduatingData, setGraduatingData, alumniData, setAlumniData, viewModal, setViewModal, handleOpenViewModal, handleCloseViewModal, setSelectedUser, selectedUser} = useDashboardStore();

  const [scholarProfiles, setScholarProfiles] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);


// Merging all sorted data
const allSortedData = [...renewalData, ...graduatingData, ...alumniData];

  const handleRefresh = () => {
    setRefreshTrigger(!refreshTrigger);
    setAlertOpen(true);
    setAlertMessage("Refreshing Dashboard");
  };

  useEffect(() => {
    const fetchScholarDashboard = async () => {
      try {
        const token = getAuthToken();

        const response = await axios.get('/api/scholarsProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setScholarProfiles(response.data.data);
          setAlertOpen(true);
          setAlertMessage('Scholar Dashboard loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', response.status);
        }

        const underGradResponse = await axios.get('/api/undergrad-acad-detail', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (underGradResponse.status === 200) {
          setUndergraduateData(underGradResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Undergraduate data loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', underGradResponse.status);
        }

        const renewalResponse = await axios.get('/api/scholar-renewal-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (renewalResponse.status === 200) {
          setRenewalData(renewalResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Renewal data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', renewalResponse.status);
        }

        const graduatingResponse = await axios.get('/api/scholar-graduating-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (graduatingResponse.status === 200) {
          setGraduatingData(graduatingResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Graduating data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }


        const alumniResponse = await axios.get('/api/scholar-alumni-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (alumniResponse.status === 200) {
          setAlumniData(alumniResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Alumni data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

        const schoolResponse = await axios.get('/api/schools', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (schoolResponse.status === 200) {
          setSchoolsData(schoolResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Schools loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', schoolResponse.status);
        }

      } catch (error) {
        setErrorMessage('Request failed with error:');
        setErrorOpen(true);
      
      }
    }; 
    fetchScholarDashboard();
  }, [refreshTrigger]);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  useEffect(() => {
    setErrorOpen(false);
    handleRefresh();
    // Reset the buttonClicked state after the effect runs
    setButtonClicked(false);
  }, [buttonClicked]);

  useEffect(() => {
    const fetchScholarDashboard = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('/api/scholarsProfile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          setScholarProfiles(response.data.data);
          setAlertOpen(true);
          setAlertMessage('Scholar Dashboard loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Request failed with error:', error);
      }
    };
  
    fetchScholarDashboard();
  }, []);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get('/api/schools', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          setSchoolsData(response.data.data);
          setAlertOpen(true);
          setAlertMessage('Schools loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

        const underGradResponse = await axios.get('/api/undergrad-acad-detail', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (underGradResponse.status === 200) {
          setUndergraduateData(underGradResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Undergraduate data loaded');
        } else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

        const renewalResponse = await axios.get('/api/scholar-renewal-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (renewalResponse.status === 200) {
          setRenewalData(renewalResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Renewal data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

        const graduatingResponse = await axios.get('/api/scholar-graduating-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (graduatingResponse.status === 200) {
          setGraduatingData(graduatingResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Graduating data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }


        const alumniResponse = await axios.get('/api/scholar-alumni-documents', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (alumniResponse.status === 200) {
          setAlumniData(alumniResponse.data.data);
          setAlertOpen(true);
          setAlertMessage('Alumni data loaded');
        }
        else {
          setErrorOpen(true);
          setErrorMessage('Request failed with status:');
        }

      } catch (error) {
        setErrorOpen(true);
        setErrorMessage('Request failed with error:');
      }
    }
    fetchSchool();
  }, []);

  const statusMapping = {
    1: "New",
    2: "For Renewal",
    3: "For Renewal: Graduating",
    4: "Renewed",
    5: "Graduating",
    6: "Graduated",
    7: "Alumni",
    8: "Withdrew",
  }

  const getStatusClassName = (statusId) => {
    switch (statusId) {
      case 1:
        return "New";
      case 2:
        return "For_Renewal";
      case 3:
        return "For_Renewal_Graduating";
      case 4:
        return "Renewed";
      case 5:
        return "Graduating";
      case 6:
        return "Graduated";
      case 7:
        return "Alumni";
      case 8:
        return "Withdrew";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const allSubmissions = [...renewalData, ...graduatingData, ...alumniData ];

  const viewScholarSubmission =  (submissionId) => {
    const selectedUser = allSubmissions.find((submission) => submission.id === submissionId);

    if (selectedUser) {
      setSelectedUser(selectedUser);
      handleOpenViewModal();
    }
    
    else {
      setErrorOpen(true);
      setErrorMessage('Submission not found');
    }

  }

    
  const extractFileName = (url, maxLength = 50) => {
    // Split the URL string by '/'
    const parts = url.split('/');
    // Get the last part which represents the file name
    const fileNameWithExtension = parts[parts.length - 1];
    // Split the file name by '.' to separate the name and extension
    const fileNameParts = fileNameWithExtension.split('.');
    // Remove the last part which is the file extension
    fileNameParts.pop();
    // Join the remaining parts to get the file name without extension
    let fileName = fileNameParts.join('.');
    // Limit the length of the file name and add ellipsis if it exceeds maxLength
    if (fileName.length > maxLength) {
      fileName = fileName.substring(0, maxLength) + '...';
    }
    return fileName;
  };

  return (
    <Layout>
         <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            {/* Header */}
            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
                <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Dashboard</MUI.Typography>
                          
                  {/* Add User Button */}
                  <MUI.Button variant="contained"
                    onClick={handleRefresh}
                    sx={{
                      backgroundColor: '#FFFFFF', 
                      color: '#091E42',
                      '&:hover': {
                        backgroundColor: 'transparent', // Set the background color to transparent on hover
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)', // Add the desired shadow on hover
                      },
                    }}>
                    <MUI.Typography variant='h5'>Refresh </MUI.Typography>
                    <MUI.LoopIcon />
                  </MUI.Button> 

                </MUI.Box>
            </MUI.Grid>

            {/* Introduction Box */}
            <MUI.Grid item xs={12} md={8} lg={8}>
            <MUI.Paper
               elevation={3}
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'row', 
                  height: '280px',
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderRadius: '12px'
                }}
              >
                <div>
                  <MUI.Typography variant='h2'sx={{fontWeight: 'bold'}} m={2}>Welcome, Admin to Scholarlink</MUI.Typography>

                  <MUI.Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
                    <MUI.Typography variant='h5' pb={2}>
                      Check out the
                      <MUI.Typography component={Link} to="" variant='h5' sx={{textDecoration: 'none'}}> Scholarlink User Guide </MUI.Typography> 
                      for a quick tutorial 
                    </MUI.Typography>

                    <MUI.Typography variant='h5'>
                      Contact{' '}
                      <MUI.Link
                        href="mailto:cbmedallada@student.apc.edu.ph"
                        variant='h5'
                        sx={{ textDecoration: 'none' }}
                      >
                        See So Support Team
                      </MUI.Link>{' '}
                      for any issues or questions
                    </MUI.Typography>
                  </MUI.Box>
                </div>
                <img src={LogoImg} alt="Your Image Alt Text" style={{ width: '200px', height: '200px' }} />
              </MUI.Paper>
              
            </MUI.Grid>
            {/* Scholars Status Report */}
              <MUI.Grid item xs={12} md={2} lg={4}>
                <MUI.Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <MUI.Typography variant='h3' sx={{fontWeight: 'bold'}} >Academic Status</MUI.Typography>
                  <br/>

                  <MUI.Grid container alignItems="center" ml={1}>
                    <MUI.ApartmentIcon sx={{ color: '#1976d2' }} />
                    <MUI.Grid item>
                      <MUI.Typography variant='h5' sx={{ color: '#1976d2', ml: 1 }}>
                      {schoolsData.find((school) => school.id === scholarProfiles.school_id)?.school_name || 'School Not Found'}
                      </MUI.Typography>
                    </MUI.Grid>
                  </MUI.Grid>
                <br/>

                <MUI.Grid container alignItems="center" ml={1}>
                    <MUI.SchoolOutlinedIcon   sx={{color: '#1976d2'}}/>
                  <MUI.Grid item>
                    <MUI.Typography variant='h5'  sx={{color: '#1976d2' , ml: 1}}>{undergraduateData.current_yr_level || 'No Data yet'}</MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid> 

                <br/>
                
                <MUI.Grid container alignItems="center" ml={1}>
                    <MUI.CalendarTodayIcon  sx={{color: '#1976d2'}}/>
                  <MUI.Grid item>
                    <MUI.Typography variant='h5'  sx={{color: '#1976d2', ml: 1}}>{undergraduateData.undergrad_sy || 'No Data yet'}</MUI.Typography>
                  </MUI.Grid>
                </MUI.Grid> 
                </MUI.Paper>

                <MUI.Grid item xs={12} md={8} lg={12} mt={2}>
                  <MUI.Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                    }}
                  >
                  <MUI.Grid container alignItems="center">
                    <MUI.Typography variant='h4' sx={{ fontWeight: 'bold' }}>Scholar Status :</MUI.Typography>
                    <MUI.Typography variant='h5' ml={2} className={getStatusClassName(scholarProfiles.scholar_status_id)}> {statusMapping[scholarProfiles.scholar_status_id] || 'Unknown'}</MUI.Typography>
                  </MUI.Grid>
                  </MUI.Paper>
                </MUI.Grid>
              </MUI.Grid>
              
          </MUI.Grid>

          <MUI.Grid xs={12} mt={2}>
            <MUI.Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
              }}
            >
              <MUI.Typography variant='h3' sx={{fontWeight: 'bold', mb: 4}} >Submissions</MUI.Typography>

              <MUI.TableContainer>
                    <MUI.Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: 0 }}>
                      <MUI.TableHead>
                        <MUI.TableRow>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none', borderTopLeftRadius: '12px' }}>Submission</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none' }}>Submitted</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderRight: 'none' }}>Status</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderTopRightRadius: '12px' }}>Remarks</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderTopRightRadius: '12px' }}>Terms</MUI.TableCell>
                          <MUI.TableCell sx={{ background: '#f5f5f5', fontWeight: 'bold', fontSize: '1rem', padding: '16px', textAlign: 'left', borderBottom: 'none', borderTopRightRadius: '12px' }}>Action</MUI.TableCell>
                        </MUI.TableRow>
                      </MUI.TableHead>

                      <MUI.TableBody>
                        {allSubmissions
                          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by date
                          .map((item, index) => (
                            <MUI.TableRow key={index}>
                              <MUI.TableCell sx={{ borderBottom: 'none', borderRight: 'none', padding: '16px', textAlign: 'left' }}>
                                {item.gwa_value ? "Renewal Form" : item.graduateName   ? "Graduating Form" : item.company_name ? "Alumni Form" : ""}
                              </MUI.TableCell>
                              <MUI.TableCell sx={{ borderBottom: 'none', borderRight: 'none', padding: '16px', textAlign: 'left' }}>
                                {formatDate(item.updated_at.replace('T', ' ').replace('.000000Z', ''))}
                              </MUI.TableCell>
                              <MUI.TableCell sx={{ borderBottom: 'none', borderRight: 'none', padding: '16px', textAlign: 'left' }}>
                                {item.submission_status === 'For Approval' ? (
                                  <span className='For_Approval'>For Approval</span>
                                ) : item.submission_status === 'Approved' ? (
                                  <span className='Approved'>Approved</span>
                                ) : item.submission_status === 'For Resubmission' ? (
                                  <span className='For_Resubmission'>For Resubmission</span>
                                ) : (
                                  <span className='No_Submission'>No Submission</span>
                                )}
                              </MUI.TableCell>
                              <MUI.TableCell sx={{ width: '30%', borderBottom: 'none', borderRight: 'none', padding: '16px', textAlign: 'left' }}>
                                {item.remarks_message || 'No Remarks yet'}
                              </MUI.TableCell>
                              <MUI.TableCell sx={{ borderBottom: 'none', padding: '12px' }}>
                                {item.term_submitted || 'No Terms'}
                              </MUI.TableCell>

                              <MUI.TableCell sx={{ borderBottom: 'none', padding: '12px' }}>
                                <MUI.Button
                                  variant="contained"
                                  onClick={() => viewScholarSubmission(item.id)}
                                >
                                  <MUI.Typography variant='h6' sx={{color: '#FFFFFF'}}>View</MUI.Typography>
                                </MUI.Button>
                              </MUI.TableCell>
                            </MUI.TableRow>
                          ))}
                      </MUI.TableBody>


                    </MUI.Table>
                  </MUI.TableContainer>
            </MUI.Paper>
          </MUI.Grid>
            
          
        </MUI.Container>


        {/* Dialog for Viewing Files */}
        <MUI.Dialog open={viewModal} onClose={handleCloseViewModal}  fullWidth maxWidth="md">
          <MUI.DialogTitle>
            <MUI.Typography variant="h4" sx={{ fontWeight: 'bold' }} mb={2}>
              File Viewer
            </MUI.Typography>

          </MUI.DialogTitle>

          <MUI.DialogContent>
  <MUI.Grid container spacing={2}>
    <MUI.Grid item xs={12} md={6}>

      


      <MUI.Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={2}>
        Year Submitted: {selectedUser ? selectedUser.school_yr_submitted || selectedUser.year_submitted : ''}
      </MUI.Typography>

      {/* Render data based on submission type */}
      {selectedUser && selectedUser.gwa_value && (
        <div>

          <MUI.Typography variant="h5" sx={{ fontWeight: 'bold' }} mb={2}>
            Term Submitted: {selectedUser.term_submitted }
          </MUI.Typography>

          <div style={{ marginBottom: '20px' }}>
            <MUI.Typography variant="h4" sx={{ fontWeight: 'bold' }}>Scholar Information</MUI.Typography>
            <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>GWA Value:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.gwa_value}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>GWA Remarks:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.gwa_remarks}</MUI.Typography>
            </div>
          </div>

          <div>
            <MUI.Typography variant="h4" sx={{ fontWeight: 'bold' }}>Documentary Requirements</MUI.Typography>
            <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Copy of Report Card:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.copyOfReportCard)}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Copy of Registration Form:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.copyOfRegistrationForm)}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Scanned Written Essay:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.scannedWrittenEssay)}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Letter of Gratitude:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.letterOfGratitude)}</MUI.Typography>
            </div>
          </div>
        </div>
      )}

      {selectedUser && selectedUser.graduateName && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <MUI.Typography variant="h4" sx={{ fontWeight: 'bold' }}>Scholar Information</MUI.Typography>
            <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Graduating Name:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.graduateName}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>School Graduated:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.schoolGraduated}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Address School</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.addressSchool}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Year Entered and Graduated:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.yearEnteredGraduated}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Program:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.program}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Full Address:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.street}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email Address</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.user_email_address}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Mobile Number:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.user_mobile_num}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Future Plan:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.futurePlan}</MUI.Typography>
            </div>

          </div>

          <div>
            <MUI.Typography variant="h4" sx={{ fontWeight: 'bold' }}>Documentary Requirements</MUI.Typography>
            <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Copy of Report Card:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.copyOfReportCard)}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Copy of Registration Form:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.copyOfRegistrationForm)}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Scanned Written Essay:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.scannedWrittenEssay)}</MUI.Typography>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Letter of Gratitude:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.letterOfGratitude)}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Statement of Account:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.statementOfAccount)}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Graduating of Picture:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.graduationPicture)}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Transcript of Records:</MUI.Typography>
              <MUI.Typography variant="body1">{extractFileName(selectedUser.transcriptOfRecords)}</MUI.Typography>
            </div>

          </div>
        </div>
      
      )}


      {selectedUser && selectedUser.company_name && (
        <div>

          <div style={{ marginBottom: '20px' }}>

            <MUI.Typography variant="h4" sx={{ fontWeight: 'bold' }}>Alumni Information</MUI.Typography>
            <hr style={{ border: '1px solid #ccc', margin: '10px 0' }} />
            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Company Name:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.company_name}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Company Address:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.company_location}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Position:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.position_in_company}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Licensure Exam Type:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.licensure_exam_type || "Didn't take any Licensure Examination"}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Exam Passed Date:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.exam_passed_date || "Didn't take any Licensure Examination"}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Volunteer Group Name:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.volunteer_group_name}</MUI.Typography>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <MUI.Typography variant="h6" sx={{ fontWeight: 'bold' }}>Year Volunteered:</MUI.Typography>
              <MUI.Typography variant="body1">{selectedUser.yr_volunteered}</MUI.Typography>
            </div>
          </div>

        </div>
      )}
      

      {/* Add similar conditions for other types of submissions (Graduating Form, Alumni Form) */}
    </MUI.Grid>

    {/* You can add another grid item for rendering other fields if needed */}
  </MUI.Grid>
</MUI.DialogContent>

          <MUI.DialogActions>
            <MUI.Button onClick={handleCloseViewModal} variant="contained">
              Close
            </MUI.Button>
          </MUI.DialogActions>

        </MUI.Dialog>

        {/* Pop up Dialog  for Privacy Notice and Warning */}
        <EditProfileDialog />




        <MUI.Snackbar
            open={alertOpen}
            autoHideDuration={5000}
            onClose={() => setAlertOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setAlertOpen(false)} variant="filled" severity="success" sx={{ width: '100%' }}>
              {alertMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>

          <MUI.Snackbar
            open={errorOpen}
            autoHideDuration={5000}
            onClose={() => setErrorOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MUI.MuiAlert onClose={() => setErrorOpen(false)} variant='filled' severity='error' sx={{width: '100%'}}>
              {errorMessage}
            </MUI.MuiAlert>
          </MUI.Snackbar>


      </MUI.ThemeProvider>
  </Layout>
  )
}
