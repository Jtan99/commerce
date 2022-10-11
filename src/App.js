import React, { useState, useEffect } from 'react';

import { Products, Navbar } from "components";
import { commerce } from 'lib/commerce';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Products />
    </div>
  )
}

export default App;
