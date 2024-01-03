import React from 'react'
import * as MUI from '../../import'
import Layout from '../../component/Layout/SidebarNavbar/Layout'
import theme from '../../context/theme';
import { Link, Form } from 'react-router-dom';
import { DevTool } from "@hookform/devtools";
import {useForm, Controller } from 'react-hook-form';
import usePartnerStore from '../../store/PartnerStore';
import { Search, SearchIconWrapperV2,StyledInputBaseV2 } from '../../component/Layout/SidebarNavbar/Styles';

const USER_REGEX = /^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/;

const FormValues = {
  partnerName: '',
  partnerMobileNum: '',
  partnerSchool: '',
}

export default function Partner({state}) {

  const form  = useForm();
  const { register, control, handleSubmit, formState, reset, validate} = form
  const { errors } = formState;
  
  const { 
    searchQuery,
    handleSearch,
    updatePartner, 
    setEditPartner, 
    editPartner, 
    partner, 
    handleClosePartner, 
    handleOpenPartner, 
    selectedPartner, 
    setSelectedPartner, 
    filteredPartner, 
    setFilteredPartner, 
    addPartner = ((store) => store.addPartner),
    deletePartner = ((store) => store.deletePartner),
    partners = ((store) => store.partners.filter((partner) => partner.state === state)),
  } = usePartnerStore();  

  const onSubmit = (data) => {
    console.log("Form submitted", data);

    if (editPartner) {
      updatePartner(selectedPartner.id, data.partnerName, data.partnerMobileNum, data.partnerSchool);
      setEditPartner(false);
      form.reset(FormValues);
    } else {
      addPartner(data.partnerName, data.partnerMobileNum, data.partnerSchool);
    }
    form.reset();
    handleClosePartner();
  }

  const handleEditPartner = (partnerId) => {
    const selectedPartner = partners.find((partner) => partner.id === partnerId);
    if (selectedPartner) {
      setSelectedPartner(selectedPartner);
      reset({
        partnerName: selectedPartner.partnerName,
        partnerMobileNum: selectedPartner.partnerMobileNum,
        partnerSchool: selectedPartner.partnerSchool,
      });
      setEditPartner(true);
      handleOpenPartner();
    }
  };

  const handleDeletePartner = (partnerId) => {
    const selectedPartner = partners.find((partner) => partner.id === partnerId);
    if (selectedPartner) {
      deletePartner(selectedPartner.id);
    }
  }

  const handleCancelPartner = () => {
    form.reset(FormValues);
    setEditPartner(false);
    handleClosePartner();
  }


  return (
    <Layout>
        <MUI.ThemeProvider theme={theme}>
        <MUI.Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <MUI.Grid container spacing={3}>

            <MUI.Grid item xs={12}>
              <MUI.Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{xs: 'left', md: 'center'}} margin={2} justifyContent="space-between">
              <MUI.Typography variant="h1" id="tabsTitle" sx={{color: 'black'}}>Partners</MUI.Typography>
                        
                {/* Add User Button */}
                <MUI.Button variant="contained" id='addButton' onClick={handleOpenPartner}>
                  <MUI.PersonAddAltOutlinedIcon sx={{mr: 1}}/>
                  <MUI.Typography variant='body2'>Add Partners</MUI.Typography>
                </MUI.Button> 

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
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </Search>
                            

              <MUI.IconButton aria-label="filter">
                <MUI.FilterListIcon />
              </MUI.IconButton>

              <MUI.FormControl>
                <MUI.Select
                  value={filteredPartner}
                  onChange={(e) => setFilteredPartner(e.target.value)}
                  native
                  sx={{width: '100px', border: '1px solid rgba(0,0,0,0.2)',
                  boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)', borderRadius: '15px', height: '50px'}}
                >
                  <option value="All">All</option>
                  <option value="Holy Spirit National College">Holy Spirit National College</option>
                  <option value="Asia Pacific College">Asia Pacific College</option>
                </MUI.Select>
              </MUI.FormControl>
            </MUI.Container>

            {/* -------- Table Section  ----------*/}
          <MUI.TableContainer sx={{ backgroundColor: '#fbf3f2', margin: '2rem 0 0 1rem' }}>
            <MUI.Table> 
              <MUI.TableHead>
                <MUI.TableRow>
                  <MUI.TableCell>Name</MUI.TableCell>
                  <MUI.TableCell>Mobile Number</MUI.TableCell>
                  <MUI.TableCell>School</MUI.TableCell>
                  <MUI.TableCell>Action</MUI.TableCell>
                </MUI.TableRow>
              </MUI.TableHead>
                <MUI.TableBody>
                  {partners
                    .filter((partner) => filteredPartner === 'All' || partner.partnerSchool === filteredPartner)
                    .filter((partner) => (partner.partnerName.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .reverse()
                    .map((partner) => (
                      (partner.partnerName || partner.partnerMobileNum || partner.partnerSchool) && (
                    <MUI.TableRow key={partner.id} className='partner' >
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerName'>{partner.partnerName}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerMobileNum'>{partner.partnerMobileNum}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none'}}  className='partnerSchool'>{partner.partnerSchool}</MUI.TableCell>
                      <MUI.TableCell sx={{border: 'none',  color: '#2684ff' }}>

                        <MUI.IconButton color="inherit" onClick={() => handleEditPartner(partner.id)}>
                          <MUI.BorderColorIcon />
                        </MUI.IconButton>

                        <MUI.IconButton color="inherit" sx={{ textTransform: 'capitalize' }} onClick={() => handleDeletePartner(partner.id)}>
                          <MUI.DeleteIcon />
                        </MUI.IconButton>

                      </MUI.TableCell>
                    </MUI.TableRow>
                  )))}
                </MUI.TableBody>
            </MUI.Table>
            <MUI.Divider sx={{width:'100%'}}/>
          </MUI.TableContainer>   


          {/* -------- Add Partner Dialog ----------*/}
          <MUI.Dialog open={partner} onClose={handleClosePartner} fullWidth maxWidth="xs" component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
            <MUI.DialogTitle id="dialogTitle">{editPartner ? 'Edit Partner' : 'Add Partner'}</MUI.DialogTitle>
            <MUI.Typography variant='body2' id="dialogLabel">Required fields are marked with an asterisk *</MUI.Typography>
            <MUI.DialogContent>
              
              <MUI.Grid id="partnerNameGrid">
                <MUI.InputLabel htmlFor="partnerName" id="partnerNameLabel">Name</MUI.InputLabel>
                <MUI.TextField
                  type='text'
                  id="partnerName"
                  placeholder='Christian Medallada'
                  fullWidth

                  {...register('partnerName', {
                    required: {
                      value: true,
                      message: 'Partner Name is required'
                    },
                    pattern: {
                      value: USER_REGEX,
                      message: 'Names should only contain letters, periods, and hypens, with no leading or hanging spaces.'
                    }
                  })}
                />
                {errors.partnerName && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr'/>
                    {errors.partnerName?.message}
                  </p>
                )}   
              </MUI.Grid>

              <MUI.Grid id="partnerMobileNumGrid">
                <MUI.InputLabel htmlFor="partnerMobileNum" id="partnerMobileNumLabel">Mobile Number</MUI.InputLabel>
                <MUI.TextField
                  type='text'
                  id="partnerMobileNum"
                  placeholder='09123456789'
                  fullWidth

                  {...register('partnerMobileNum', {
                    required: {
                      value: true,
                      message: 'Mobile Number is required'
                    },
                  })}
                />
                {errors.partnerMobileNum && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr'/>
                    {errors.partnerMobileNum?.message}
                  </p>
                )}
              </MUI.Grid>

              <MUI.Grid id="partnerSchoolGrid">
                <MUI.InputLabel htmlFor="partnerSchool" id="partnerSchoolLabel">School</MUI.InputLabel>
                <MUI.TextField
                  type='text'
                  id="partnerSchool"
                  placeholder='school'
                  fullWidth

                  {...register('partnerSchool', {
                    required: {
                      value: true,
                      message: 'School is required'
                    },
                  })}
                />
                {errors.partnerSchool && (
                  <p id='errMsg'>
                    <MUI.InfoIcon className='infoErr'/>
                    {errors.partnerSchool?.message}
                  </p>
                )}
              </MUI.Grid>
               
            </MUI.DialogContent>

            <MUI.DialogActions>
              <MUI.Button onClick={handleCancelPartner} id="cancelButton">Cancel</MUI.Button>
              <MUI.Button type='submit' variant='contained' id="submitButton">{editPartner ? "Save Changes" : 'Add Partner'}</MUI.Button>
            </MUI.DialogActions>
          </MUI.Dialog>

          
          </MUI.Grid>
        </MUI.Container>
        </MUI.ThemeProvider>
    </Layout>
  )
}
