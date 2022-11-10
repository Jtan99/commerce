import React, { useState, useEffect } from 'react';

import { Products, Navbar, Cart } from 'components';
import { commerce } from 'lib/commerce';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
  const [cart, setCart] = useState({});
  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart)
  }

  useEffect( () => {
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  }

  console.log(cart);

  return (
    <Router>
      <div className='app'>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route path='/' element={
            <Products onAddToCart = {handleAddToCart} />
          } />
          <Route path='/cart' element={
            <Cart cart={cart} />
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
