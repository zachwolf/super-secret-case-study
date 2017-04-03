export const SCREEN_SM = '@media (max-width: 1040px)'

export const COLOR = {
  TEXT_DARKEST: '#000',
  TEXT_LIGHTEST: '#fff',
  BULLSEYE_RED: '#C71713',
  CHARCOAL: '#999999',
  ASH: '#ccc',
  WHY_ANOTHER_GREY: '#D3D2D2', // todo: better naming maybe
  DEVIL_GREY: '#666',
  UNSATURATED_SALMON: '#F3F3F3',
  LIGHTER_UNSATURATED_SALMON: '#F6F5F5',
  LINK_BLUE: '#0E69C9'
}

export const GLOBAL_STYLES = [
  {
    selector: '*',
    rules: {
      boxSizing: 'border-box'
    }
  },
  {
    selector: 'body',
    rules: {
      fontFamily: 'Helvetica Neue, Helvetica, sans-serif'
    }
  },
  {
    selector: 'input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button',
    rules: {
      '-webkit-appearance': 'none'
    }
  }
]

export default {
  shelf: {
    sm: {
      marginBottom: 30
    },
    tight: {
      marginBottom: 20
    },
    md: {
      marginBottom: 60
    }
  },
  button: {
    common: {
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      fontSize: 18,
      fontWeight: 300,
      padding: '10px 40px',
      borderRadius: 3,
      borderWidth: 1,
      borderStyle: 'solid',
      color: COLOR.TEXT_LIGHTEST,
      ":hover": {
        backgroundImage: 'none',
        cursor: 'pointer'
      }
    },
    secondary: {
      borderColor: COLOR.TEXT_DARKEST,
      backgroundColor: COLOR.TEXT_DARKEST,
      backgroundImage: `linear-gradient(to bottom, #656565, ${COLOR.TEXT_DARKEST})`
    },
    action: {
      borderColor: COLOR.BULLSEYE_RED,
      backgroundColor: COLOR.BULLSEYE_RED,
      backgroundImage: `linear-gradient(to bottom, #DF6A6B, ${COLOR.BULLSEYE_RED})`
    }
  },
  visuallyhidden: { 
    position: 'absolute',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    height: 1,
    width: 1,
    margin: -1,
    padding: 0,
    border: 0,
  }
}