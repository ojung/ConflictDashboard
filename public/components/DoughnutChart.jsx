import React, {PropTypes} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {OrderedSet} from 'immutable';

const options = {
  tooltips: {
    callbacks: {
      label: ({index}, {datasets, labels}) => {
        return labels[index] + ': '
          + datasets[0].data[index].toLocaleString() + ' Euro';
      }
    }
  }
};

class DoughnutChart extends React.Component {
  render() {
    const {data, countries} = this.props;
    if (countries.size <= 0) {
      return null;
    }

    return (
      <Doughnut
        data={data}
        options={options}
        redraw
      />
    );

  }
}

DoughnutChart.propTypes = {
  data: PropTypes.object.isRequired,
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
};

export default DoughnutChart;
