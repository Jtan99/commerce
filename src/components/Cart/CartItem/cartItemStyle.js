import { makeStyles } from '@material-ui/core/styles';

const light_red = '#f50057';

export default makeStyles(() => ({
  media: {
    height: 0,
    backgroundSize: '250px',
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  remove: {
    backgroundColor: light_red,
    color: 'white',
  }
}));