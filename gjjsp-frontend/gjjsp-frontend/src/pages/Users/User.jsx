import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';

export default function User() {
  return (
    <Layout>
      <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>
      
      <MUI.Grid item xs={12}>
        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
          <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Users</MUI.Typography>
                    
            {/* Add User Button */}
            <MUI.Button variant="contained" color="primary" sx={{ textTransform: 'none' }} onClick="">
              Add Users 
            </MUI.Button>

          </MUI.Box>
        </MUI.Grid>


        {/* Add User Dialog */}
        <MUI.Dialog open="" onClose="" fullWidth maxWidth="sm">
          {/* Content of the Dialog */}
          <MUI.DialogTitle>Add Users</MUI.DialogTitle>
            <MUI.DialogContent>
              {/* Form Fields of New User*/}
                <MUI.InputLabel htmlFor="event">Name</MUI.InputLabel>
                  <MUI.TextField 
                    placeholder='Events' 
                    value="{event}"
                    fullWidth 
                  />

                  <MUI.InputLabel htmlFor="recipient">Email</MUI.InputLabel>
                  <MUI.TextField 
                    placeholder='Recipients' 
                    value="{recipients}"
                    fullWidth 
                  />

                  <MUI.InputLabel htmlFor="recipient">Role</MUI.InputLabel>
                  <MUI.TextField 
                    placeholder='Recipients' 
                    value="{recipients}"
                    fullWidth 
                  />  
                    
                    {/* Add more form fields as needed */}
            </MUI.DialogContent>

              <MUI.DialogActions>
                {/* Add action buttons, e.g., Save Changes and Cancel */}
                <MUI.Button onClick="" color="primary">
                  Cancel
                </MUI.Button>
                  <MUI.Button onClick=""
                    color="primary">
                    Add
                  </MUI.Button>
              </MUI.DialogActions>

        </MUI.Dialog>

        <Search>
            <SearchIconWrapperV2>
              <MUI.SearchIcon />
            </SearchIconWrapperV2>
            <StyledInputBaseV2
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
      </MUI.Grid>
      </MUI.Container>
  </Layout>
  )
}
