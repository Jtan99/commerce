import React from 'react';
import { AppBar, Toolbar, IconButton, Badge} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assets/commerce.jpg'
import useStyles from './navbarStyles'

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <h2 className={classes.title}>
          <img src={logo} alt="Commerce.js" className={classes.image} />
          E-Commerce Store
        </h2>
        <div className={classes.grow} />
        <div className={classes.button}>
          <IconButton aria-label="Show cart items">
            <Badge badgeContent={2} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
