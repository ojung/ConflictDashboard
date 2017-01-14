import React, {PropTypes} from 'react';
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
  render() {
    const {data, countries} = this.props;
    if (countries.size <= 0) {
      return null;
    }

    return (
      <Line
        data={data}
        options={options(data.datasets.length >= 2)}
        height={100}
      />
    );
  }
}

StackedChart.propTypes = {
  data: PropTypes.object.isRequired,
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
};

export default StackedChart;
