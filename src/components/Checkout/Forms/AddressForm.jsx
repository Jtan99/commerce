import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InputLabel, Select, MenuItem, Button, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import useStyles from './formStyles';
import FormInput from './CustomTextField';
import { fetchShippingCountriesFromCommerce, fetchCountrySubdivisionsFromCommerce, fetchShippingOptionsFromCommerce } from "lib/commerce"

function AddressForm({ checkoutToken, next }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();
  const classes = useStyles();

  useEffect(() => {
    const fetchShippingCountries = async () => {
      const { countries } = await fetchShippingCountriesFromCommerce(checkoutToken.id);
      setShippingCountries(Object.entries(countries));
    }
    fetchShippingCountries();
  }, []);

  useEffect(() => {
    const fetchShippingSubdivisions = async (countryCode) => {
      const { subdivisions } = await fetchCountrySubdivisionsFromCommerce(countryCode);

      setShippingSubdivisions(Object.entries(subdivisions));
    }
    if(shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    const fetchShippingOptions = async (checkoutTokenId, country, region) => {
      const options = await fetchShippingOptionsFromCommerce(checkoutTokenId, country, region);
      setShippingOptions(options);
    }
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit( (data) => 
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption
            })
          )}>
            <div className={classes.gridContainer}>
              <FormInput required name="firstName" label="First name" />
              <FormInput required name="lastName" label="Last name" />
              <FormInput required name="address1" label="Address" />
              <FormInput required name="email" label="Email" />
              <FormInput required name="city" label="City" />
              <FormInput required name="zip" label="ZIP / Postal Code" />
            </div>
            <div className={classes.gridContainer}>
              <div>
                <InputLabel className={classes.dropDownLabel}>Shipping Country</InputLabel>
                <Select defaultValue="" value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                  {shippingCountries.map(([code, country]) => (
                  <MenuItem key={code} value={code}>
                    {country}
                  </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <InputLabel className={classes.dropDownLabel}>Shipping Subdivisions</InputLabel>
                <Select defaultValue="" value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                  {shippingSubdivisions.map(([code, subdivision]) => (
                    <MenuItem key={code} value={code}>
                      {subdivision}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className={classes.gridContainer}>
              <div>
                <InputLabel className={classes.dropDownLabel}>Shipping Options</InputLabel>
                <Select defaultValue="" value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                {shippingOptions.map((option) =>  (
                  <MenuItem key={option.id} value={option.id}>
                    {`${option.description} - (${option.price.formatted_with_symbol})`}
                  </MenuItem>
                ))}
                </Select>
              </div>
            </div><br/>
            <div className={classes.centerContainer}>
              <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
              <Button type="submit" variant="contained" color="primary">Next</Button>
            </div>
          </form>
      </FormProvider>
    </div>
  )
}

export default AddressForm
