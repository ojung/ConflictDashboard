import React, {PropTypes} from 'react';
import {Navbar} from 'react-bootstrap';
import {OrderedSet} from 'immutable';
import {Typeahead} from 'react-bootstrap-typeahead';

import SelectedCountriesContainer from './SelectedCountriesContainer';

const FilterBar = ({suggestions, onClick, onChange}) => (
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
    <Navbar.Text>
      <SelectedCountriesContainer />
    </Navbar.Text>
  </Navbar>
);

FilterBar.propTypes = {
  suggestions: PropTypes.instanceOf(OrderedSet).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilterBar;
