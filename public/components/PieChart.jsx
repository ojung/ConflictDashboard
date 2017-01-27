import React, {PropTypes} from 'react';
import randomColor from 'randomcolor';
import {Pie} from 'react-chartjs-2';
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

const colors = [randomColor(), randomColor(), randomColor()];

class DoughnutChart extends React.Component {
  render() {
    const {types, datasets, countries} = this.props;
    if (countries.isEmpty() || datasets.isEmpty()) {
      return null;
    }

    const myDatasets = [{
      data: datasets.toJS(),
      backgroundColor: [colors[0], colors[1], colors[2]],
    }];

    return (
      <Pie
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
