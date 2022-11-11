import React, { useState, useEffect } from 'react';

import { Products, Navbar, Cart } from 'components';
import { commerce } from 'lib/commerce';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  const [cart, setCart] = useState({});

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart)
  };

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  };

  const handleUpdateCart = async (lineItemId, quantity) => {
    setCart(await commerce.cart.update(lineItemId, {quantity}));
  };

  const handleRemoveFromCart = async (productId) => {
    setCart(await commerce.cart.remove(productId));
  };

  const handleEmptyCart = async () => {
    setCart(await commerce.cart.empty());
  };

  useEffect( () => {
    fetchCart();
  }, []);

  return (
    <Router>
      <div className='app'>

        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path='/' element={
            <Products onAddToCart = {handleAddToCart} />
          } />
          <Route path='/cart' element={
            <Cart cart={cart}
              handleUpdateCart={handleUpdateCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleEmptyCart={handleEmptyCart}
            />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
