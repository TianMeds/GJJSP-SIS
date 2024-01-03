import React from 'react';
import * as MUI from '../../import';
import useNotificationStore from '../../store/NotificationStore';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import theme from '../../context/theme';
import { Link, useLocation } from 'react-router-dom';

export default function Notification({state}) {

  {/* --------------------- Use Dialog Store  ----------------------*/}
  const { 
    openDialog,
    editedEmail,
    email,
    handleOpenDialog,
    handleCloseDialog,
    setEditedEmail,
    handleSaveChanges,
    notification,
    handleOpenNotif,
    handleCloseNotif, 
    event,
    recipient,
    setEvent,
    setRecipient,
    editNotif,
    setEditNotif,
    updateNotif,
    selectedNotif,
    setSelectedNotif,
    addNotif = ((store) => store.addNotif),
    deleteNotif = ((store) => store.deleteNotif),
    notifs = ((store) => store.notifs.filter((notification) => notification.state === state)),
  } = useNotificationStore();

  const handleAddNotif = () => {
   if(editNotif) {
    updateNotif(selectedNotif.id, event, recipient);
    setEditNotif(false);
   }
   else{
    addNotif(event, recipient);
   }
    setEvent('');
    setRecipient('');
    handleCloseNotif();
  }

  const handleEditNotif = (notifId) => {
    const selectedNotif = notifs.find((notification) => notification.id === notifId);
    if (selectedNotif) {
      setSelectedNotif(selectedNotif);
      setEvent(selectedNotif.event);
      setRecipient(selectedNotif.recipient);
      setEditNotif(true)
      handleOpenNotif();
    }
  }

  const handleDeleteNotif = (notifId) => {
    const selectedNotif = notifs.find((notification) => notification.id === notifId);
    if (selectedNotif) {
      deleteNotif(selectedNotif.id);
    }
  }

  const handleCancelNotif = () => {
    handleCloseNotif();
    setEvent('');
    setRecipient('');
    setEditNotif(false);
  }


  return (
    <Layout>
      <MUI.ThemeProvider theme={theme}>
      {/* -------- Main Content  ----------*/}
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>
            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection='row' alignItems="center" sx={{mb: 3}}>
              
              <MUI.IconButton component={Link} to="/">
                <MUI.KeyboardBackspaceIcon />
              </MUI.IconButton>
              <MUI.Typography variant="body2" component="span">
                Back to Dashboard
              </MUI.Typography>
              
              </MUI.Box>

              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
                <MUI.Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Reminders</MUI.Typography>
                    
                {/* Add Notification Button */}
                <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenNotif}>
                  Add Reminder
                </MUI.Button>

              </MUI.Box>
            </MUI.Grid>

            {/* -------- Email Section  ----------*/}
            <MUI.Grid item xs={12}>
                  <MUI.Typography variant="h5" sx={{fontSize: '1rem'}}>Email</MUI.Typography>
                    <MUI.Box 
                      display="flex"
                      flexDirection={{ xs: 'column', sm: 'row' }}
                      alignItems="flex-start"
                      justifyContent="space-between"
                      mt={1}
                      border={1}
                      borderRadius={1}
                      borderColor="primary.main"
                      p={3}
                      flexWrap="wrap"
                    >

                        {/* Left Section (Email Icon and Address) */}
                        <MUI.Box display="flex"  flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" >
                          <MUI.Box sx={{ marginRight: 1  }}>
                            <MUI.IconButton color="primary" variant="outlined" size="small">
                              <MUI.MailIcon />
                            </MUI.IconButton>
                          </MUI.Box>
                          <MUI.Typography variant="body1" color="textSecondary" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, fontSize: '0.9rem' }}>
                            {email}
                          </MUI.Typography>
                        </MUI.Box>

                        {/* Right Section (Edit Email Button) */}
                        <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenDialog}>
                          Edit Email
                        </MUI.Button>
                    

                        {/* -------- Dialog when press Edit Email   ----------*/}
                        <MUI.Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                          {/* Content of the Dialog */}
                          <MUI.DialogTitle>Edit Email</MUI.DialogTitle>
                            <MUI.DialogContent>
                              {/* Add your editing email form or content here */}
                              <MUI.TextField 
                              placeholder='New Email' 
                              value={editedEmail}
                              onChange={(e) => setEditedEmail(e.target.value)} 
                              fullWidth />
                            </MUI.DialogContent>
                          <MUI.DialogActions>
                            {/* Add action buttons, e.g., Save Changes and Cancel */}
                            <MUI.Button onClick={handleCloseDialog} color="primary">
                              Cancel
                            </MUI.Button>
                            <MUI.Button onClick={handleSaveChanges} color="primary">
                              Save Changes
                            </MUI.Button>
                          </MUI.DialogActions>
                        </MUI.Dialog>

                    </MUI.Box>
                </MUI.Grid>

                <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
                  <MUI.Table> 
                    <MUI.TableHead>
                      <MUI.TableRow>
                        <MUI.TableCell>Event</MUI.TableCell>
                        <MUI.TableCell>Recipient</MUI.TableCell>
                        <MUI.TableCell>Actions</MUI.TableCell>
                      </MUI.TableRow>
                    </MUI.TableHead>
                    <MUI.TableBody>
                        {notifs.reverse().map((notification, index) => (
                          (notification.event || notification.recipient) && (
                        <MUI.TableRow key={index} className='row' >
                        <MUI.TableCell sx={{border: 'none'}}  className='event'>{notification.event}</MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}  className='recipient'>{notification.recipient}</MUI.TableCell>
                        <MUI.TableCell sx={{border: 'none'}}>
                          <MUI.IconButton
                            color="inherit"
                            onClick={() => handleEditNotif(notification.id)}
                          >
                            <MUI.BorderColorIcon sx={{marginLeft:  -2}} />
                          </MUI.IconButton>

                          <MUI.IconButton
                            color="inherit"
                            onClick={() => handleDeleteNotif(notification.id)}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            <MUI.DeleteIcon />

                          </MUI.IconButton>
                        </MUI.TableCell>
                        </MUI.TableRow>
                        )
                        ))}
                      </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>

                 {/* -------- Sent Notifications Section  ----------*/}
                 <MUI.Grid item xs={12}>
                  <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
                    <MUI.Typography variant="h2" sx={{ fontWeight: 'bold', fontSize: '2.5rem', mt: 3 }}> Sent Reminders</MUI.Typography>
                  </MUI.Box>
                </MUI.Grid>

                <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
                  <MUI.Table>
                  <MUI.TableHead>
                    <MUI.TableRow>
                        <MUI.TableCell>Subject</MUI.TableCell>
                        <MUI.TableCell>Recipient</MUI.TableCell>
                        <MUI.TableCell>Responds</MUI.TableCell>
                        <MUI.TableCell>Date Sent</MUI.TableCell>
                        <MUI.TableCell>Actions</MUI.TableCell>
                    </MUI.TableRow>
                    </MUI.TableHead>
                    <MUI.TableBody>
                      <MUI.TableRow  className='row' >
                      <MUI.TableCell sx={{border: 'none'}}>Renewal of Application</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  >Renewing Scholar</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none', color: 'red'}}  >5/40 Submitted</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>10:58 am  12/07/2023</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleEditNotif(notification.id)}
                          sx={{ marginLeft: {xs: 1, md: -2}}}
                        >
                          <MUI.BorderColorIcon />
                        </MUI.IconButton>

                        <MUI.IconButton
                          color="inherit"
                          onClick={() => handleDeleteNotif(notification.id)}
                          sx={{ textTransform: 'capitalize', marginLeft: 1  }}
                        >
                          <MUI.DeleteIcon />

                        </MUI.IconButton>
                      </MUI.TableCell>
                      </MUI.TableRow>
                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>

                {/* Add Notification Dialog */}
              <MUI.Dialog open={notification} onClose={handleCloseNotif} fullWidth maxWidth="sm">
                {/* Content of the Dialog */}
                <MUI.DialogTitle variant='h3' sx={{fontWeight: 'bold'}}>Add Notification</MUI.DialogTitle>
                <MUI.DialogContent>
                  {/* Form Fields of New Notification */}
                  <MUI.InputLabel htmlFor="event">Event</MUI.InputLabel>
                    <MUI.TextField 
                      placeholder='Events' 
                      value={event}
                      onChange={(e) => setEvent(e.target.value)} 
                      fullWidth 
                    />

                    <MUI.InputLabel htmlFor="schoolType">Type</MUI.InputLabel>
                    <MUI.FormControl sx={{  width: '100%', borderRadius: '8px',}}>
                      <MUI.Select
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                        native
                        sx={{mb: 2}}
                      >
                        <option value="" disabled>Select School Type</option>
                        <option value="All Users">All Users</option>
                        <option value="New Scholar">New Scholar</option>
                        <option value="Renewing Scholar">Renewing Scholar</option>
                        <option value="Graduating Scholar">Graduating Scholar</option>
                        <option value="Alumni">Alumni</option>
                      </MUI.Select>
                    
                    </MUI.FormControl>
                    
                    
                    {/* Add more form fields as needed */}
                </MUI.DialogContent>

                  <MUI.DialogActions>
                    {/* Add action buttons, e.g., Save Changes and Cancel */}
                    <MUI.Button onClick={handleCloseNotif} color="primary">
                      Cancel
                    </MUI.Button>
                    <MUI.Button 
                    variant='contained'
                    onClick={handleAddNotif}
                    color="primary">
                    {editNotif ? 'Save Changes' : 'Add Notification'}
                    </MUI.Button>
                  </MUI.DialogActions>

              </MUI.Dialog>
          </MUI.Grid>
        </MUI.Container>
      </MUI.ThemeProvider>
    </Layout>
  )
}