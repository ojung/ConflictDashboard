import {connect} from 'react-redux';

import FilterBar from './FilterBar.jsx';
import {
  loadSuggestions,
  addCountry,
  clearSuggestions,
} from '../actions/';

const mapStateToProps = ({suggestions}) => {
  return {suggestions};
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
  };
};

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar);
export default FilterBarContainer;
