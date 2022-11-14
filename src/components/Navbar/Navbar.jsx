import React, { useContext} from 'react';
import { AppBar, Toolbar, IconButton, Badge} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import { CartContext } from 'contexts/CartContext';

import logo from 'assets/commerce.jpg'
import useStyles from './navbarStyles'

const Navbar = () => {
  const classes = useStyles();
  const { cart }= useContext(CartContext);
  const location = useLocation();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <h2 component={Link} to="/cart" className={classes.title}>
          <a className={classes.link} href="/">
            <img src={logo} alt="Commerce.js" className={classes.image} />
            E-Commerce Store
          </a>
        </h2>
        <div className={classes.grow} />
        {location.pathname === '/' && (
          <div className={classes.button}>
            <IconButton component={Link} to="/cart" aria-label="Show cart items">
              <Badge badgeContent={cart.total_items} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
