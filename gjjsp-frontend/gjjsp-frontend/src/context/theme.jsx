import * as MUI from '../import'

const theme = MUI.createTheme({
  typography: {
    fontFamily: ['"Segoe UI"', 'sans-serif'].join(','),
    fontSize: 14,
    h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        color: '#311b92',
    },
    h2: {
        fontSize: '2rem',
        fontWeight: 500,
        color: '#311b92',
    },
    h3: {
        fontSize: '1.5rem',
        fontWeight: 500,
        color: '#311b92',
    },
    h4: {
        fontSize: '1.2rem',
        fontWeight: 500,
        color: '#311b92',
    },
    h5: {
        fontSize: '1rem',
        fontWeight: 500,
    },
    h6: {
        fontSize: '0.8rem',
        fontWeight: 500,
        color: '#311b92',
    },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
        color: '#311b92',
    },
    body2: {
        fontSize: '0.8rem',
        fontWeight: 400,
        textTransform: 'none'
    },
    error: {
        fontSize: '0.9rem',
        fontWeight: 400,
        color: '#f44336',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: '10px',
        },
        contained: {
          color: 'white',
        },
        text: {
            color: '#311b92',
        }
      },
    },
    MuiLink: {
        styleOverrides: {
            root: {
            color: '#311b92',
            textDecoration: 'none',
            },
        },
    },
  },
});

export default theme;