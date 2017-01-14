import Promise from 'bluebird';
import {connect} from 'react-redux';

import Charts from './Charts.jsx';
import {fetchStackedLineData, setIsFetching} from '../actions';

const getCountries = ({countries}) => countries;

const getStackedChartData = ({stackedChartData}) => stackedChartData;

const getIsFetching = ({isFetching}) => isFetching;

const mapStateToProps = (state) => {
  return {
    stackedChartData: getStackedChartData(state),
    countries: getCountries(state),
    isFetching: getIsFetching(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (countries) => {
      dispatch(setIsFetching(true));
      Promise.all([
        dispatch(fetchStackedLineData({countries})),
      ])
        .then(() => dispatch(setIsFetching(false)));
    }
  };
};

const ChartsContainer =
  connect(mapStateToProps, mapDispatchToProps)(Charts);
export default ChartsContainer;
