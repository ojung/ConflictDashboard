import Promise from 'bluebird';
import {connect} from 'react-redux';

import Charts from './Charts.jsx';
import {
  fetchStackedLineChartDatasets,
  fetchRadarChartDatasets,
  setIsFetching,
  fetchDoughnutChartData,
  fetchYears,
  fetchResorts,
} from '../actions/index';

const getCountries = ({countries}) => countries;

const getStackedChartDatasets = ({stackedChartDatasets}) => stackedChartDatasets;

const getDoughnutChartData = ({doughnutChartData}) => doughnutChartData;

const getIsFetching = ({isFetching}) => isFetching;

const getYears = ({years}) => years;

const getResorts = ({resorts}) => resorts;

const getRadarChartDatasets = ({radarChartDatasets}) => radarChartDatasets;

const mapStateToProps = (state) => {
  return {
    stackedChartDatasets: getStackedChartDatasets(state),
    doughnutChartData: getDoughnutChartData(state),
    countries: getCountries(state),
    years: getYears(state),
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
      ])
        .then(() => dispatch(setIsFetching(false)));
    },
    loadData: (countries, years, resorts) => {
      if (countries.size <= 0) {
        return;
      }

      dispatch(setIsFetching(true));
      Promise.all([
        dispatch(fetchStackedLineChartDatasets({years, countries})),
        dispatch(fetchDoughnutChartData({countries})),
        dispatch(fetchRadarChartDatasets({resorts, countries})),
      ])
        .then(() => dispatch(setIsFetching(false)));
    }
  };
};

const ChartsContainer =
  connect(mapStateToProps, mapDispatchToProps)(Charts);
export default ChartsContainer;
