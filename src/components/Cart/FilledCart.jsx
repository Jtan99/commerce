import React, { useContext } from 'react';
import { Typography, Button} from '@material-ui/core';

import useStyles from './cartStyle';
import CartItem from './CartItem/CartItem';
import { CartContext } from 'contexts/CartContext';
import { updateProductQtyInCommerceCart, dropProductFromCommerceCart, clearCommerceCart} from 'lib/commerce';

const FilledCart = () => {
  const classes = useStyles();
  const { cart, setCart } = useContext(CartContext);

  const handleUpdateCart = async (productId, quantity) => {
    setCart(await updateProductQtyInCommerceCart(productId, quantity));
  };

  const handleRemoveFromCart = async (productId) => {
    setCart(await dropProductFromCommerceCart(productId));
  };

  const handleEmptyCart = async () => {
    setCart(await clearCommerceCart());
  };

  return (
  <div>
    <div className={classes.gridStyles}>
      {cart.line_items.map( (item) => (
        <div key={item.id} className='item'>
          <CartItem product={item} onUpdateCart={handleUpdateCart} onRemoveFromCart={handleRemoveFromCart} />
        </div>
      ))}
    </div>
    <div className={classes.cardDetails}>
      <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
      <div>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
      </div>
    </div>
  </div>
  )
}

export default FilledCart;