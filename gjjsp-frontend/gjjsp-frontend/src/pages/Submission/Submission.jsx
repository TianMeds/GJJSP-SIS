import React from 'react'
import * as MUI from '../../import';
import Layout from '../Components/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../Components/Styles';
import useDialogStore from '../Components/store';

export default function Submission() {
  return (
    <Layout>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

      <MUI.Grid item xs={12}>
        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between">
          
          <MUI.Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Submission</MUI.Typography>
          
          </MUI.Box>
        </MUI.Grid> 

        <MUI.Container sx={{mt: 4, display: 'flex', alignItems: 'center' }}>
          <Search>
            <SearchIconWrapperV2>
              <MUI.SearchIcon />
            </SearchIconWrapperV2>
            <StyledInputBaseV2
              placeholder="Search for Scholarship Project or Benefactor"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
                        

        <MUI.IconButton aria-label="filter">
          <MUI.FilterListIcon />
        </MUI.IconButton>

        <MUI.FormControl sx={{  width: '180px', border: '2px solid #032539', borderRadius: '8px'}}>
                  <MUI.Select
                    native
                  >
                    <option value="All">All</option>
                    <option value="Closed for Application">Closed Application</option>
                    <option value="Open for Application">Open Application</option>
                  </MUI.Select>
               
              </MUI.FormControl>
        </MUI.Container>

    </MUI.Grid>
    </MUI.Container>
  </Layout>
  )
}
