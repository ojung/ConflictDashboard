import {connect} from 'react-redux';

import FilterBar from './FilterBar.jsx';
import {
  loadSuggestions,
  addCountry,
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
        dispatch(clearSuggestions());
      }
      if (value.length >= 2) {
        dispatch(loadSuggestions(value));
      }
    },
    onClick: (value) => {
      if (value.length) {
        dispatch(addCountry(String(value)));
      }
    },
    removeCountry: (country) => dispatch(removeCountry(country)),
  };
};

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar);
export default FilterBarContainer;
