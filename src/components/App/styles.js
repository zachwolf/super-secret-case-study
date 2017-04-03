import { COLOR, SCREEN_SM, SCREEN_LG } from '../common/styles.js'

// images
import hangTag from '../../assets/hang-tag.png'

export default {
  layout: {
    wrapper: {
      [SCREEN_SM]: {
        padding: '0 20px',
        margin: '60px auto',
        maxWidth: 480
      },
      [SCREEN_LG]: {
        margin: '40px auto',
        padding: '0 20px',
        position: 'relative',
        maxWidth: 1040
      }
    },
    chunk: {
      [SCREEN_LG]: {
        width: '50%'
      }
    },
    chunkRight: {
      [SCREEN_LG]: {
        position: 'absolute',
        zIndex: 1,
        right: 0,
        top: 0
      }
    }
  },
  pageTitle: {
    color: COLOR.TEXT_DARKEST,
    fontWeight: 100,
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 1.1,
    marginBottom: 40
  },
  promo: {
    wrapper: {
      borderColor: COLOR.ASH,
      borderWidth: '1px 0',
      borderStyle: 'solid',
      marginTop: 40,
      marginLeft: -20,
      marginRight: -20,
      marginBottom: 20,
      padding: 15
    },
    icon: {
      height: 17,
      width: 18,
      background: `url(${hangTag})`,
      display: 'inline-block',
      marginRight: 10,
      transform: 'translateY(6px)'
    },
    item: {
      common: {
        color: COLOR.BULLSEYE_RED,
        textTransform: 'lowercase',
        marginBottom: 5,
        fontSize: 17,
      },
      last: {
        marginBottom: 0
      }
    }
  },
  returns: {
    wrapper: {
      display: 'flex'
    },
    title: {
      textTransform: 'lowercase',
      fontSize: 20,
      fontWeight: 300,
      color: COLOR.DEVIL_GREY,
      alignSelf: 'center'
    },
    body: {
      borderLeft: `1px solid ${COLOR.ASH}`,
      marginLeft: 15,
      paddingLeft: 15,
      color: COLOR.TEXT_DARKEST,
      fontSize: 11,
      lineHeight: 1.1
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      ':hover': {
        textDecoration: 'underline'
      }
    }
  },
  buttonList: {
    wrapper: {
      display: 'flex'
    },
    button: {
      common: {
        textTransform: 'uppercase',
        borderRadius: 4,
        border: 'none',
        background: COLOR.UNSATURATED_SALMON,
        width: '33%',
        marginRight: 6,
        cursor: 'pointer',
        paddingTop: 6,
        paddingBottom: 6,
        fontSize: 12,
        ':hover': {
          textDecoration: 'underline'
        }
      },
      last: {
        marginRight: 0
      }
    }
  },
  highlights: {
    title: {
      fontSize: 35,
      textTransform: 'lowercase',
      marginLeft: 10
    },
    list: {
      marginLeft: 30
    },
    item: {
      listStyleType: 'disc',
      marginBottom: 10,
      fontSize: 14
    }
  }
}