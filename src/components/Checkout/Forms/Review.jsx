import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './reviewStyles';

const Review = ({checkoutToken}) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" gutterBottom>Order summary</Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product)=>(
          <ListItem className={classes.listPadding}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
          <ListItem className={classes.listPadding}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.boldFont}>
            {checkoutToken.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </div>
  )
}

export default Review
