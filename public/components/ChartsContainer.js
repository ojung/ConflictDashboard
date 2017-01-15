import Promise from 'bluebird';
import {connect} from 'react-redux';

import Charts from './Charts.jsx';
import {
  fetchStackedLineChartDatasets,
  setIsFetching,
  fetchDoughnutChartData,
  fetchYears,
} from '../actions/index';

const getCountries = ({countries}) => countries;

const getStackedChartDatasets = ({stackedChartDatasets}) => stackedChartDatasets;

const getDoughnutChartData = ({doughnutChartData}) => doughnutChartData;

const getIsFetching = ({isFetching}) => isFetching;

const getYears = ({years}) => years;

const mapStateToProps = (state) => {
  return {
    stackedChartDatasets: getStackedChartDatasets(state),
    doughnutChartData: getDoughnutChartData(state),
    countries: getCountries(state),
    years: getYears(state),
    isFetching: getIsFetching(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadYears: () => {
      dispatch(setIsFetching(true));
      dispatch(fetchYears())
        .then(() => dispatch(setIsFetching(false)));
    },
    loadData: (countries, years) => {
      if (countries.size <= 0) {
        return;
      }

      dispatch(setIsFetching(true));
      Promise.all([
        dispatch(fetchStackedLineChartDatasets({years, countries})),
        dispatch(fetchDoughnutChartData({countries})),
      ])
        .then(() => dispatch(setIsFetching(false)));
    }
  };
};

const ChartsContainer =
  connect(mapStateToProps, mapDispatchToProps)(Charts);
export default ChartsContainer;
