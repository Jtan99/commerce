import React from 'react';
import {Link} from 'react-router-dom';
import { Typography } from '@material-ui/core';

import useStyles from './cartStyle';

const EmptyCart = () => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="subtitle1">
        You have no items in your shopping cart,
        <Link to="/" className={classes.link}> start adding some!</Link>
      </Typography>
    </div>
  )
}

export default EmptyCart;