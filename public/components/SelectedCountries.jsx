import React, {PropTypes} from 'react';
import {Label} from 'react-bootstrap';
import {OrderedSet} from 'immutable';

const SelectedCountries = ({countries, removeCountry}) => (
  <div>
    {countries.map(country => (
      <Label key={country} onClick={() => removeCountry(country)}>{country}</Label>
    ))}
  </div>
);

SelectedCountries.propTypes = {
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
  removeCountry: PropTypes.func.isRequired,
};

export default SelectedCountries;
