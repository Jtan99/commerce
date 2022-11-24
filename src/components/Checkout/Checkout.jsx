import React, { useState, useEffect, useContext } from 'react';
import { Stepper, Step, StepLabel, Typography} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

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
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState({});

  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await fetchCheckoutToken(cart);
        setChekoutToken(token);
      } catch (error) {
        if (activeStep != steps.length) {
          navigate("/");
        }
      }
    }
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep(activeStep + 1);
  const backStep = () => setActiveStep(activeStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  }

const displayForm = () => {
  switch(activeStep) {
    case 0:
      return <AddressForm checkoutToken={checkoutToken} next={next} />;
    case 1:
      return <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} setOrder={setOrder}/>;
    default:
      return <ConfirmationForm order={order} />;
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