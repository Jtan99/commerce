import React, { useContext} from 'react';
import { Container, Typography, } from '@material-ui/core';

import useStyles from './cartStyle';

import EmptyCart from './EmptyCart';
import FilledCart from './FilledCart';
import { CartContext } from 'contexts/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  const classes = useStyles();
  if(!cart.line_items) return 'Loading...';

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>

      {cart.line_items.length === 0 ? 
        <EmptyCart /> :
        <FilledCart/>
      }
    </Container>
  )
}

export default Cart;
