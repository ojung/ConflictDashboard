import {connect} from 'react-redux';

import FilterBar from './FilterBar.jsx';
import {
  loadSuggestions,
  addCountry,
  addCountries,
  clearSuggestions,
  removeCountry,
} from '../actions/';

const mapStateToProps = ({suggestions, countries}) => {
  return {suggestions, countries};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (value) => {
      if (value.length === 0) {
        return dispatch(clearSuggestions());
      }
      return dispatch(loadSuggestions(value));
    },
    onClick: (value) => {
      if (value.length) {
        return dispatch(addCountry(String(value)));
      }
    },
    removeCountry: (country) => dispatch(removeCountry(country)),
    addQuickSelection: (countries) => dispatch(addCountries(countries)),
  };
};

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar);
export default FilterBarContainer;
