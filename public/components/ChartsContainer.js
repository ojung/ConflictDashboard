import Promise from 'bluebird';
import {connect} from 'react-redux';

import Charts from './Charts.jsx';
import {
  fetchStackedLineChartData,
  setIsFetching,
  fetchDoughnutChartData
} from '../actions/index';

const getCountries = ({countries}) => countries;

const getStackedChartData = ({stackedChartData}) => stackedChartData;

const getDoughnutChartData = ({doughnutChartData}) => doughnutChartData;

const getIsFetching = ({isFetching}) => isFetching;

const mapStateToProps = (state) => {
  return {
    stackedChartData: getStackedChartData(state),
    doughnutChartData: getDoughnutChartData(state),
    countries: getCountries(state),
    isFetching: getIsFetching(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (countries) => {
      if (countries.size <= 0) {
        return;
      }

      dispatch(setIsFetching(true));
      Promise.all([
        dispatch(fetchStackedLineChartData({countries})),
        dispatch(fetchDoughnutChartData({countries})),
      ])
        .then(() => dispatch(setIsFetching(false)));
    }
  };
};

const ChartsContainer =
  connect(mapStateToProps, mapDispatchToProps)(Charts);
export default ChartsContainer;
