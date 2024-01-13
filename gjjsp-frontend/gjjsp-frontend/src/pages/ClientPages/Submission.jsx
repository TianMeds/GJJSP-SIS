import React from 'react'
import * as MUI from '../../import';
import Layout from '../../component/Layout/SidebarNavbar/Layout';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';
import useSubmissionStore from '../../store/SubmissionStore';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import faker from 'faker';

export default function Submission({state}) {

  const {
    submission,
    filteredSubmission,
    setFilteredSubmission,
    submissions = ((store) => store.submissions.filter((submission) => submission.state === state)),
    searchQuery,
    handleSearch,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    pressedRows,
    setPressedRows,
  } = useSubmissionStore();

  
  const handleBookmarkClick = (rowId) => {
    setPressedRows((prevPressedRows) => {
      if (prevPressedRows.includes(rowId)) {
        return prevPressedRows.filter((id) => id !== rowId);
      } else {
        return [...prevPressedRows, rowId];
      }
    });
  };

  {/* FAKE DATA FOR RENDERING */}

  const scholarshipType = [
    'Gado - FORMAL Education',
    'Gado - TechVoc',
    'Jess - Window of Oppurtunites'
  ]

  const submissionType = [
    'New Application',
    'Renewal of Application',
    'Graduating Form', 
  ]

  const submissionStatus= ['SAVED', 'SUBMITTED', 'RESUBMISSION'];

  const generateFakeData = () => {
    const data = [];
    for (let i = 1; i <= 50; i++) {
      data.push({
        id: i,
        column1: `Data ${i}`,
        column2: faker.name.findName(),
        column3: scholarshipType[i % scholarshipType.length],
        column4: submissionType[i % submissionType.length],
        column5: submissionStatus[i % submissionStatus.length],
        column6: `Data ${i + 250}`,
        column7: faker.name.findName(),
      });
    }
    return data;
  };

  const rows = generateFakeData();

  const lastIndex = (page + 1) * rowsPerPage;
  return (
    <Layout>
    <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MUI.Grid container spacing={3}>

        <MUI.Grid item xs={12}>
        <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} justifyContent="space-between">
              <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Submission</MUI.Typography>
                        
              <MUI.Box>     
                {/* Add User Button */}
                <MUI.Button variant="contained" component={Link} to='/notification' state={{ from: 'submission'}} id='addButton' sx={{mr:4}} >
                  <MUI.NotificationsIcon  sx={{transform: 'rotate(45deg)', mr: 1}}/>
                  <MUI.Typography variant='body2'>Send reminder</MUI.Typography>
                </MUI.Button>
              </MUI.Box>  

            </MUI.Box>
        </MUI.Grid> 

        <MUI.Container sx={{mt: 4, display: 'flex', alignItems: 'center', mb: 6, ml: -2 }}>
          <Search>
            <SearchIconWrapperV2>
              <MUI.SearchIcon />
            </SearchIconWrapperV2>
            <StyledInputBaseV2
              placeholder="Search for Scholarship Project or Benefactor"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearch}
            />
          </Search>
                        

          <MUI.IconButton aria-label="filter">
            <MUI.FilterListIcon />
          </MUI.IconButton>

          <MUI.FormControl>
            <MUI.Select
              value={filteredSubmission}
              onChange={(e) => setFilteredSubmission(e.target.value)}
              native
              sx={{width: '100px', border: '1px solid rgba(0,0,0,0.2)',
              boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
            >
              <option value="All">All</option>
              <option value="SAVED">Saved</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="RESUBMISSION">Resubmission</option>
            </MUI.Select>
          </MUI.FormControl>
        </MUI.Container>

        <MUI.TableContainer>
            <MUI.Table>
              <MUI.TableHead>
                <MUI.TableRow>
                  <MUI.TableCell>Scholar's Name</MUI.TableCell>
                  <MUI.TableCell>Scholarship type</MUI.TableCell>
                  <MUI.TableCell>Submission</MUI.TableCell>
                  <MUI.TableCell>Submitted</MUI.TableCell>
                  <MUI.TableCell>Status</MUI.TableCell>
                  <MUI.TableCell>Action</MUI.TableCell>
                  <MUI.TableCell>Responder</MUI.TableCell>
                </MUI.TableRow>
              </MUI.TableHead>
              <MUI.TableBody>
                {rows
                .slice(page * rowsPerPage, lastIndex)
                .filter((row) => filteredSubmission === 'All' || row.column5 === filteredSubmission)
                .filter((row) => row.column2 && row.column2.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((row) => (
                  <MUI.TableRow key={row.id}>
                    <MUI.TableCell>{row.column2}</MUI.TableCell>
                    <MUI.TableCell>{row.column3}</MUI.TableCell>
                    <MUI.TableCell>{row.column4}</MUI.TableCell>
                    <MUI.TableCell>{row.column6}</MUI.TableCell>
                    <MUI.TableCell>
                     <MUI.Typography>
                     <span className={classNames('submissionStatus', row.column5)}>
                        {row.column5}
                      </span>
                     </MUI.Typography>
                    </MUI.TableCell>
                    <MUI.TableCell>

                      <MUI.Button component={Link} to="/view" sx={{ marginLeft: -1}}>
                        <MUI.Typography sx={{fontSize: 'small'}}>
                          View
                        </MUI.Typography>
                      </MUI.Button>

                    <MUI.IconButton
                                color="inherit"
                                onClick={() => handleEditSchool(school.id)}
                                sx={{ marginLeft: 1}}
                              >
                                <MUI.InsertCommentOutlinedIcon/>

                              </MUI.IconButton>

                            
                    </MUI.TableCell>
                    <MUI.TableCell>{row.column7}</MUI.TableCell>
                  </MUI.TableRow>
                ))}
                
              </MUI.TableBody>
            </MUI.Table>
          </MUI.TableContainer>

            <MUI.TablePagination 
              style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
              rowsPerPageOptions={[5, 10, 25]} // You can customize the options
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage === 0 ? 1 : newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />

    </MUI.Grid>
    </MUI.Container>
  </Layout>
  )
} 
