import React, {PropTypes} from 'react';
import tinycolor from 'tinycolor2';
import {Navbar, Label, Glyphicon} from 'react-bootstrap';
import {OrderedSet} from 'immutable';
import {Typeahead} from 'react-bootstrap-typeahead';

const FilterBar = ({
  suggestions,
  onClick,
  onChange,
  countries,
  removeCountry
}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a>Filter</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Navbar.Form pullLeft>
      <Typeahead
        onChange={onClick}
        options={suggestions.map(item => item.name = item.key).toJS()}
        onInputChange={onChange}
      />
    </Navbar.Form>
    <div style={{padding: 18}}>
      {countries
          .map(country => {
            const color = tinycolor(country.color);
            return (
              <Label
                style={{
                  color: color.isLight() ? '#000' : '#fff',
                  backgroundColor: country.color,
                  marginRight: 3,
                  cursor: 'pointer',
                }}
                onClick={() => removeCountry(country)}
                key={country.name}
                href="#"
              >
                {country.name}
                <Glyphicon glyph="remove" style={{paddingLeft: 5}} />
              </Label>
            );
          })
      }
    </div>
  </Navbar>
);

FilterBar.propTypes = {
  suggestions: PropTypes.instanceOf(OrderedSet).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  removeCountry: PropTypes.func.isRequired,
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
};

export default FilterBar;
