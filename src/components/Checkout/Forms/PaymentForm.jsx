import React, { useContext, useState } from 'react'
import { Typography, Button, Divider, CircularProgress } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';
import { refreshCommerceCart, sendCheckoutRequest } from 'lib/commerce';
import { CartContext } from 'contexts/CartContext';
import useStyles from './formStyles';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, backStep, nextStep, shippingData, setOrder }) => {
  const {setCart} = useContext(CartContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const classes = useStyles();

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    setProcessing(true);
    if(!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if(error) {
      console.log(error);
    } else{
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname:shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: { 
          name: "Primary Shipping",
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'test_gateway',
          card: {
            number: '4242424242424242',
            expiry_month: '02',
            expiry_year: '24',
            cvc: '123',
            postal_zip_code: '94107',
          },
        },
      }
      handleCheckout(checkoutToken.id, orderData)
    }
  }

  const handleCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await sendCheckoutRequest(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      setCart(await refreshCommerceCart());
      nextStep();
    } catch (error) {
      console.log("failed to checkout");
      setErrorMessage(error.data.error.message);
    }
  }

  return (
    <div>
      <Review checkoutToken={checkoutToken}/>
      <Divider /><br/>
      <Typography variant="h6" gutterBottom> Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          { ({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> < br/>
              <div className={classes.centerContainer}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                {
                  processing ? 
                    <Button variant="contained" disabled color="primary"><CircularProgress size="1rem" /></Button> : 
                    <Button  type="submit" variant="contained" disabled={!stripe} color="primary">
                      Pay { checkoutToken.subtotal.formatted_with_symbol }
                    </Button>
                }
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm
