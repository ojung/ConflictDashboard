import React, {PropTypes} from 'react';
import tinycolor from 'tinycolor2';
import {Label, Glyphicon} from 'react-bootstrap';
import {OrderedSet} from 'immutable';

const SelectedCountries = ({countries, removeCountry}) => {
  if (countries.size <= 0) {
    return null;
  }
  return (
    <div>
      {countries
          .map(country => {
            const color = tinycolor(country.color);
            return (
              <Label
                style={{
                  color: color.isLight() ? '#000' : '#fff',
                  margin: 2,
                  backgroundColor: '#' + country.color,
                }}
                key={country.name}
                onClick={() => removeCountry(country)}
              >
                {country.name}
                <Glyphicon glyph="remove" />
              </Label>);
          })
      }
    </div>
  );
};

SelectedCountries.propTypes = {
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
  removeCountry: PropTypes.func.isRequired,
};

export default SelectedCountries;
