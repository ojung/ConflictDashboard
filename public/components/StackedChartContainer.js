import {connect} from 'react-redux';

import StackedChart from './StackedChart.jsx';
import {fetchStackedLineData, setIsFetching} from '../actions';

const getCountries = ({countries}) => countries;

const getStackedChartData = ({stackedChartData}) => stackedChartData;

const getIsFetching = ({isFetching}) => isFetching;

const mapStateToProps = (state) => {
  return {
    data: getStackedChartData(state),
    countries: getCountries(state),
    isFetching: getIsFetching(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (countries) => {
      dispatch(setIsFetching(true));
      dispatch(fetchStackedLineData({countries}))
        .then(() => dispatch(setIsFetching(false)));
    },
  };
};

const StackedChartContainer =
  connect(mapStateToProps, mapDispatchToProps)(StackedChart);
export default StackedChartContainer;
