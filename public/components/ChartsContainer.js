import Promise from 'bluebird';
import {connect} from 'react-redux';

import Charts from './Charts.jsx';
import {
  fetchStackedLineChartDatasets,
  fetchRadarChartDatasets,
  setIsFetching,
  fetchDoughnutChartDatasets,
  fetchYears,
  fetchResorts,
  fetchTypes,
} from '../actions/index';

const getCountries = ({countries}) => countries;

const getStackedChartDatasets = ({stackedChartDatasets}) => stackedChartDatasets;

const getDoughnutChartDatasets =
  ({doughnutChartDatasets}) => doughnutChartDatasets;

const getIsFetching = ({isFetching}) => isFetching;

const getYears = ({years}) => years;

const getResorts = ({resorts}) => resorts;

const getTypes = ({types}) => types;

const getRadarChartDatasets = ({radarChartDatasets}) => radarChartDatasets;

const mapStateToProps = (state) => {
  return {
    stackedChartDatasets: getStackedChartDatasets(state),
    doughnutChartDatasets: getDoughnutChartDatasets(state),
    countries: getCountries(state),
    years: getYears(state),
    types: getTypes(state),
    resorts: getResorts(state),
    isFetching: getIsFetching(state),
    radarChartDatasets: getRadarChartDatasets(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStaticData: () => {
      dispatch(setIsFetching(true));
      Promise.all([
        dispatch(fetchYears()),
        dispatch(fetchResorts()),
        dispatch(fetchTypes()),
      ])
        .then(() => dispatch(setIsFetching(false)));
    },
    loadData: (countries, years, resorts, types) => {
      dispatch(setIsFetching(true));
      Promise.all([
        dispatch(fetchStackedLineChartDatasets({years, countries})),
        dispatch(fetchDoughnutChartDatasets({types, countries})),
        dispatch(fetchRadarChartDatasets({resorts, countries})),
      ])
        .then(() => dispatch(setIsFetching(false)));
    }
  };
};

const ChartsContainer =
  connect(mapStateToProps, mapDispatchToProps)(Charts);
export default ChartsContainer;
