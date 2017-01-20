import React, {PropTypes} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {List, OrderedSet} from 'immutable';

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
    const {types, datasets, countries} = this.props;
    if (countries.isEmpty() || datasets.isEmpty()) {
      return null;
    }

    const myDatasets = [{
      data: datasets.toJS(),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56'
      ],
    }];

    return (
      <Doughnut
        data={{
          labels: types.toJS(),
          datasets: myDatasets,
        }}
        options={options}
        redraw
      />
    );

  }
}

DoughnutChart.propTypes = {
  datasets: PropTypes.instanceOf(List).isRequired,
  types: PropTypes.instanceOf(OrderedSet).isRequired,
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
};

export default DoughnutChart;
