import React, {PropTypes} from 'react';
import _ from 'lodash/fp';
import {Line} from 'react-chartjs-2';
import {List, OrderedSet} from 'immutable';

const options = {
  scales: {
    yAxes: [{
      stacked: true,
      ticks: {
        callback: label => label.toLocaleString()
      },
      scaleLabel: {
        display: true,
        labelString: 'in Euro'
      }
    }],
  },
  legend: {
    display: false,
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const myDataset = data.datasets[tooltipItem.datasetIndex];
        return myDataset.label + ': '
          + tooltipItem.yLabel.toLocaleString() + ' Euro';
      },
    },
  },
};

const lineConfig = {
  fill: true,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointBorderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  spanGaps: false,
};

const getChartJsDatasets = datasets => {
  return datasets
    .map(datum => _.assignAll([{}, lineConfig, datum]))
    .toJS();
};

class StackedLineChart extends React.Component {
  render() {
    const {years, datasets, countries} = this.props;
    if (countries.isEmpty() || datasets.isEmpty()) {
      return null;
    }

    const newObject = _.assign({}, {
      labels: years.toJS(),
      datasets: getChartJsDatasets(datasets),
    });
    return (
      <Line
        data={newObject}
        options={options}
        height={100}
      />
    );
  }
}

StackedLineChart.propTypes = {
  years: PropTypes.instanceOf(OrderedSet).isRequired,
  datasets: PropTypes.instanceOf(List).isRequired,
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
};

export default StackedLineChart;
