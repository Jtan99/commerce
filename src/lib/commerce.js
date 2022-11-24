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
  return commerce.cart.empty();
}

const refreshCommerceCart = () =>{
  return commerce.cart.refresh();
}
const fetchCheckoutToken = ({ cart }) => {
  return commerce.checkout.generateToken(cart.id, {type: 'cart'});
}

const fetchShippingCountriesFromCommerce = (checkoutTokenId) => {
  return commerce.services.localeListShippingCountries(checkoutTokenId);
}

const fetchCountrySubdivisionsFromCommerce = (countryCode) => {
  return commerce.services.localeListSubdivisions(countryCode);
}

const fetchShippingOptionsFromCommerce = (checkoutTokenId, country, region) => {
  return commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
}

const sendCheckoutRequest = (checkoutTokenId, order) => {
  return commerce.checkout.capture(checkoutTokenId, order);
}

export {
  fetchProductsFromCommerce,
  fetchCartFromCommerce,
  addProductToCommerceCart,
  updateProductQtyInCommerceCart,
  dropProductFromCommerceCart,
  clearCommerceCart,
  refreshCommerceCart,
  fetchCheckoutToken,
  fetchShippingCountriesFromCommerce,
  fetchCountrySubdivisionsFromCommerce,
  fetchShippingOptionsFromCommerce,
  sendCheckoutRequest,
};