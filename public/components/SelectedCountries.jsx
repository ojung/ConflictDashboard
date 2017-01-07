import React, {PropTypes} from 'react';
import {Label, Glyphicon} from 'react-bootstrap';
import {OrderedSet} from 'immutable';

const SelectedCountries = ({countries, removeCountry}) => {
  if (countries.size <= 0) {
    return null;
  }
  return (
    <div>
      {countries
          .map(country => (
            <Label
              style={{margin: 1}}
              key={country}
              onClick={() => removeCountry(country)}
            >
              {country}
              <Glyphicon glyph="remove" />
            </Label>
          ))
      }
    </div>
  );
};

SelectedCountries.propTypes = {
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
  removeCountry: PropTypes.func.isRequired,
};

export default SelectedCountries;
