import Commerce from '@chec/commerce.js';

const commerce = new Commerce(process.env.REACT_APP_COMM_PUBLIC_KEY, true);

const fetchProductsFromCommerce = () => {
  return commerce.products.list();
}

const fetchCartFromCommerce = () => {
  return commerce.cart.retrieve()
}

const addProductToCommerceCart = (productId, quantity) => {
  return commerce.cart.add(productId, quantity);
}

const updateProductQtyInCommerceCart = (productId, quantity) =>{
  return commerce.cart.update(productId, {quantity});
}

const dropProductFromCommerceCart = (productId) =>{
  return commerce.cart.remove(productId);
}

const clearCommerceCart = () =>{
  return commerce.cart.empty()
}

export {
  fetchProductsFromCommerce,
  fetchCartFromCommerce,
  addProductToCommerceCart,
  updateProductQtyInCommerceCart,
  dropProductFromCommerceCart,
  clearCommerceCart
};