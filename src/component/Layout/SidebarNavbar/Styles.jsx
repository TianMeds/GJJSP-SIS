import * as MUI from '@mui/material';
import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/system';
import InputBase from '@mui/material/InputBase';

export const drawerWidth = 240;
export const customColor = '#fbf3f2';

export const AppBar = MUI.styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: customColor,
    color: 'inherit',
    borderRadius: '10px',
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

export const Drawer = MUI.styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
      backgroundColor: customColor,
      boxShadow: '39px 24px 15px -19px rgba(0,0,0,0.1)',
      borderRadius: '12px',
    },
    '& .MuiListSubheader-root': {
      display: open ? 'block' : 'none',
    },  
  }));

 

  export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      color: '#032539'
    },
    [theme.breakpoints.up('xs')]: {
      marginLeft: '10px'
    },
    }));
    
    export const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
    
    export const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
      color: '#032539',
      border: '2px solid #032539',
      borderRadius: '12px',
      '&::placeholder': {
        /* Styles for placeholder text */
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    }));

    export const SearchIconWrapperV2 = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: 0,
    }));
    export const StyledInputBaseV2 = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('md')]: {
        width: '50ch',
      },
      color: '#032539',
      border: '2px solid rgba(0,0,0,0.2)',
      boxShadow: '11px 7px 15px -3px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      
    },
    }));

  
  