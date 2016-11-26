import {connect} from 'react-redux';

import FilterBar from './FilterBar.jsx';
import {changeFormValue, loadSuggestions, addCountry} from '../actions';

const mapStateToProps = ({suggestions}) => {
  return {suggestions};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (value) => {
      if (value.length >= 2) {
        dispatch(loadSuggestions(value));
      }
    },
    onClick: (value) => {
      dispatch(addCountry(value));
    },
  };
};

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar);
export default FilterBarContainer;
