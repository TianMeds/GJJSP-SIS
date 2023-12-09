import React from 'react';
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import useDialogStore from '../Components/store';
import { useState } from 'react';

const defaultTheme = MUI.createTheme();

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
    recipients,
    setEvent,
    setRecipients,
    anchorEl,
    setAnchorEl,
  } = useDialogStore();

  {/* Function to handle when onclick*/ }
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };

  {/* Function to handle Horizontal Icon and have options  */ }
  const handleClose = () => {
      setAnchorEl(null);
  };

  const handleActionClick = (action) => {
      // Handle the selected action
      console.log(`Selected action: ${action}`);
      handleClose();
    };

  const rows = useDialogStore((store) => store.rows.filter((row) => row.state === state));
  const addRow = useDialogStore((store) => store.addRow);
  const deleteRow = useDialogStore((store) => store.deleteRow);
  const updateRow = useDialogStore((store) => store.updateRow);

  return (
    <Layout>
      {/* -------- Main Content  ----------*/}
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>
            <MUI.Grid item xs={12}>

              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
                <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '2.5rem' }}>Notifications</MUI.Typography>
                    
                {/* Add Notification Button */}
                <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick={handleOpenNotif}>
                  Add Notification
                </MUI.Button>

              </MUI.Box>
            </MUI.Grid>

            {/* Add Notification Dialog */}
              <MUI.Dialog open={notification} onClose={handleCloseNotif} fullWidth maxWidth="sm">
                {/* Content of the Dialog */}
                <MUI.DialogTitle>Add Notification</MUI.DialogTitle>
                <MUI.DialogContent>
                  {/* Form Fields of New Notification */}
                  <MUI.InputLabel htmlFor="event">Event</MUI.InputLabel>
                    <MUI.TextField 
                      placeholder='Events' 
                      value={event}
                      onChange={(e) => setEvent(e.target.value)} 
                      fullWidth 
                    />

                    <MUI.InputLabel htmlFor="recipient">Recipient</MUI.InputLabel>
                    <MUI.TextField 
                      placeholder='Recipients' 
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)} 
                      fullWidth 
                    />
                    
                    {/* Add more form fields as needed */}
                </MUI.DialogContent>

                  <MUI.DialogActions>
                    {/* Add action buttons, e.g., Save Changes and Cancel */}
                    <MUI.Button onClick={handleCloseNotif} color="primary">
                      Cancel
                    </MUI.Button>
                    <MUI.Button onClick={() => { 
                      addRow(event, recipients);
                      setEvent('')
                      setRecipients('')
                      handleCloseNotif();
                    }}
                    color="primary">
                    Add
                    </MUI.Button>
                  </MUI.DialogActions>

              </MUI.Dialog>

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

                {/* -------- Table Section  ----------*/}
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
                      {rows.reverse().map((row, index) => (
                        (row.event || row.recipients) && (
                      <MUI.TableRow key={index} className='row' >
                      <MUI.TableCell sx={{border: 'none'}}  className='event'>{row.event}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='recipients'>{row.recipients}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}>
                          <MUI.IconButton
                          color="inherit"
                          onClick={handleClick}
                          sx={{ textTransform: 'capitalize' }}
                          >
                          <MUI.MoreHorizIcon />
                          </MUI.IconButton>
                          <MUI.Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                          }}
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          getContentAnchorEl={null}
                          >
                          <MUI.MenuItem onClick={() => handleActionClick('Option 1')}>
                              Update
                          </MUI.MenuItem>
                          <MUI.MenuItem onClick={() => {
                               deleteRow(rows.length - 1);
                          }}>
                              Delete
                          </MUI.MenuItem>
                          {/* Add more options as needed */}
                          </MUI.Menu>
                      </MUI.TableCell>
                      </MUI.TableRow>
                      )
                      ))}
                    </MUI.TableBody>
                  </MUI.Table>
                  <MUI.Divider sx={{width:'100%'}}/>
                </MUI.TableContainer>   
          </MUI.Grid>
        </MUI.Container>
      </Layout>
  )
}