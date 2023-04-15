import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface TypeText {
    icon?: string;
  }

  interface TypeBackground {
    header?: string;
    footer?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: '#2e2e2e',
      white: '#ffffff',
    },
    primary: {
      light: '#bed73b',
      main: '#006fa1',
      darker: '#ea6c00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8fe9d0',
    },
    text: {
      disabled: '#777777',
      icon: '#ff963c',
      primary: '#414141',
    },
    background: {
      default: 'rgba(0,0,0,.5)',
      paper: '#fff',
      header: 'rgba(255, 255, 255, 0.1)',
      footer: 'rgba(255, 255, 255, 0.1)',
    },
  },
});

export default theme;
