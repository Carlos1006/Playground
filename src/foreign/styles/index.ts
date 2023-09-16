import { SxProps, Theme } from '@mui/material';

const DonutGraphStyle: SxProps<Theme> = () => ({
  position: 'relative',
  '.container': {
    display: 'flex',
    overflow: 'hidden',
    'justify-content': 'center',
    'align-items': 'center',
    position: 'relative',
    filter: 'drop-shadow(0 20px 7px rgba(0, 0, 0, 0.2))'
  },
  '.center': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    zIndex: 100,
    cursor: 'pointer',
    userSelect: 'none',
    'border-radius': '50%',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'flex-direction': 'column',
    'font-size': '1.5rem',
    'font-weight': '700',
    color: '#000',
    '.title': {
      textAlign: 'center'
    },
    '.subtitle': {
      color: '#13263A',
      opacity: '0.4',
      textAlign: 'center'
    }
  },
  '.graph': {
    position: 'relative',
    border: 0,
    background: 'transparent',
    padding: 0,
    margin: 0,
    svg: {
      width: '100%',
      height: '100%'
    }
  },
  '.animate': {
    transition: 'all 0.5s ease-in-out'
  }
});

export default DonutGraphStyle;
