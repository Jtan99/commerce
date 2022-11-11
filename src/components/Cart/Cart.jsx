import React from 'react';
import {Link} from 'react-router-dom';
import { Container, Typography, Button} from '@material-ui/core';

import useStyles from './cartStyle';
import CartItem from './CartItem/CartItem';


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

const FilledCart = ({ cart, onHandleUpdateCart, onHandleRemoveFromCart, onHandleEmptyCart}) => {
  const classes = useStyles();
  return (
  <div>
    <div className={classes.gridStyles}>
      {cart.line_items.map( (item) => (
        <div key={item.id} className='item'>
          <CartItem product={item} onUpdateCart={onHandleUpdateCart} onRemoveFromCart={onHandleRemoveFromCart} />
        </div>
      ))}
    </div>
    <div className={classes.cardDetails}>
      <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
      <div>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onHandleEmptyCart}>Empty Cart</Button>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
      </div>
    </div>
  </div>
  )
}

const Cart = ({ cart, handleUpdateCart, handleRemoveFromCart, handleEmptyCart }) => {
  const classes = useStyles();
  if(!cart.line_items) return 'Loading...';
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3">Your Shopping Cart</Typography>

      {cart.line_items.length === 0 ? 
        <EmptyCart /> :
        <FilledCart
          cart={cart}
          onHandleUpdateCart={handleUpdateCart}
          onHandleRemoveFromCart={handleRemoveFromCart}
          onHandleEmptyCart={handleEmptyCart}
        />
      }
    </Container>
  )
}

export default Cart;
