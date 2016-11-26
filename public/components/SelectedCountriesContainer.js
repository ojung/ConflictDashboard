import {connect} from 'react-redux';

import SelectedCountries from './SelectedCountries.jsx';
import {removeCountry} from '../actions';

const mapStateToProps = ({countries}) => ({countries});

const mapDispatchToProps = (dispatch) => ({
  removeCountry: (country) => dispatch(removeCountry(country)),
});

const SelectedCountriesContainer =
  connect(mapStateToProps, mapDispatchToProps)(SelectedCountries);
export default SelectedCountriesContainer;
