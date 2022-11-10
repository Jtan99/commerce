import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    backgroundSize: '250px',
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardHeader: {
    margin: '0px',
  },
  cardDescription: {
    color: 'black',
    display: '-webkit-box',
    overflow: 'hidden',
    '-webkitLineClamp': 2,
    '-webkitBoxOrient': 'vertical',
  }
}));