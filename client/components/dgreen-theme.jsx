import { createTheme } from '@mui/material/styles';

const dgreenTheme = createTheme({
  palette: {
    primary: {
      main: '#1EA54C'
    },
    secondary: {
      main: '#2E3D4A'
    },
    text: {
      primary: '#fff',
      secondary: '#AFAFAF'
    },
    background: {
      paper: '#1D2731',
      default: '#27303D'
    }
  },
  typography: {
    fontFamily: 'Roboto',
    button: {
      fontFamily: 'Archivo',
      fontWeight: 200,
      fontSize: '1.175rem',
      textTransform: 'none'
    },
    h1: {
      fontFamily: 'Josefin Sans',
      fontWeight: 500,
      fontSize: '3.125rem'
    },
    h2: {
      fontFamily: 'Archivo',
      fontWeight: 200,
      fontSize: '1.625rem'
    },
    h3: {
      fontFamily: 'Archivo',
      fontWeight: 200,
      fontSize: '1.175rem'
    },
    body1: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '1rem'
    }
  }
});

export default dgreenTheme;
