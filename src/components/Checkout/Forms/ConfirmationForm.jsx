import React from 'react';
import { Typography, Button, Divider, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './formStyles';

const ConfirmationForm = ({order}) => {
  const classes = useStyles();
  return order.customer ? (
    <div>
      <div>
      <Typography variant='h5'>Thank you for your purchase.</Typography>
      <Typography variant="h6">Order Reference: {order.customer_reference}</Typography><br />  
      <Divider className={classes.divider}/><br />  
      <Typography variant="h6">You should receive a shipping email within a few days. </Typography>
    </div><br />  
    <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
    </div>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  )
}

export default ConfirmationForm
