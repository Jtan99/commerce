import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './cartItemStyle';

const CartItem = ({ product, onUpdateCart, onRemoveFromCart }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image.url} title={product.name} />
      <CardContent>
        <div className={classes.cardContent}>
          <h2 className={classes.cardHeader}>{product.name}</h2>
          <h2 className={classes.cardHeader}>{product.line_total.formatted_with_symbol}</h2>
        </div>
      </CardContent>
      <CardActions className={classes.cartActions}>
        <div className={classes.buttons}>
          <Button type="button" onClick={ () => {onUpdateCart(product.id, product.quantity - 1)} }> - </Button>
          <Typography>{product.quantity}</Typography>
          <Button type="button" onClick={ () => {onUpdateCart(product.id, product.quantity + 1)} }> + </Button>
        </div>
        <Button className={classes.remove} variant="contained" type="button" onClick={ () => {onRemoveFromCart(product.id)}}>Remove</Button>
      </CardActions>
    </Card>
  )
}
export default CartItem;
