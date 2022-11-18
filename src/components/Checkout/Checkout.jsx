import React, { useState, useEffect, useContext } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'

import useStyles from './checkoutStyles';
import AddressForm from './Forms/AddressForm';
import PaymentForm from './Forms/PaymentForm';
import ConfirmationForm from './Forms/ConfirmationForm';
import { fetchCheckoutToken } from "lib/commerce";
import { CartContext } from "contexts/CartContext";

const steps = ["Shipping Address", " Payment details"];

const Checkout = () => {
  const cart = useContext(CartContext);
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setChekoutToken] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await fetchCheckoutToken(cart);
        setChekoutToken(token);
      } catch (error) {
        console.log("token error");
      }
    }
    generateToken();
  }, []);


const displayForm = () => {
  switch(activeStep) {
    case 0:
      return <AddressForm checkoutToken={checkoutToken} />;
    case 1:
      return <PaymentForm />;
    default:
      return <ConfirmationForm />;
  }
}

  return (
  <div>
    <div className={classes.toolbar} />
      <main className={classes.layout}>
        <div className={classes.test}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {checkoutToken && displayForm(activeStep)}
        </div>
      </main>
  </div>
  )
}

export default Checkout;