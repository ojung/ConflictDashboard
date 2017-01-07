import React, {PropTypes} from 'react';
import _ from 'lodash/fp';
import {Line} from 'react-chartjs-2';
import {OrderedSet} from 'immutable';

const options = () => {
  return {
    scales: {
      yAxes: [{
        stacked: true,
      }],
    },
    legend: {
      display: false,
    }
  };
};

class StackedChart extends React.Component {
  componentWillMount() {
    this.loadIfNecessary(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadIfNecessary(nextProps);
  }

  loadIfNecessary(props) {
    const {data, countries, loadData, isFetching} = props;
    const labels = OrderedSet(_.map('label', data.datasets)).sort();
    const sortedCountries = countries.sort();
    if (!isFetching && labels.size !== sortedCountries.size) {
      loadData(countries);
    }
  }

  render() {
    const {data, countries} = this.props;
    if (countries.size <= 0) {
      return null;
    }

    console.log(data.datasets.length);
    return (
      <Line
        data={data}
        options={options(data.datasets.length >= 2)}
        height={100}
        ref="chart"
      />
    );
  }
}

StackedChart.propTypes = {
  data: PropTypes.object.isRequired,
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
  loadData: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default StackedChart;
