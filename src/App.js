import React, { useState, useEffect} from 'react';

import { Products, Navbar, Cart, Checkout } from 'components';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { CartContext } from 'contexts/CartContext';
import { fetchCartFromCommerce} from 'lib/commerce';

const App = () => {
  const [cart, setCart] = useState({});
  const fetchCommerceCart = async () => {
    setCart(await fetchCartFromCommerce());
  };

  useEffect( () => {
    fetchCommerceCart();
  }, []);

  return (
    <Router>
      <div className='app'>
        <CartContext.Provider value={{cart, setCart}}>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <Products />
          } />
          <Route path='/cart' element={
            <Cart/>
          } />
          <Route path='/checkout' element={
            <Checkout />
          } />
        </Routes>
        </CartContext.Provider>
      </div>
    </Router>
  )
}

export default App;
