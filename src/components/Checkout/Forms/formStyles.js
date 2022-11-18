import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  gridContainer: {
    display: "grid", 
    "grid-template-columns": "repeat( auto-fit, minmax(250px, 1fr) )",
    "column-gap" : "20px",
  },
  dropDownLabel: {
    margin: "15px 0 5px",
  }
}));