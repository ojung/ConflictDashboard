import React, {PropTypes} from 'react';
import _ from 'lodash/fp';
import tinycolor from 'tinycolor2';
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

const getLineConfig = (country) => {
  const color = tinycolor(country.color);
  const brightColor = color.clone().lighten();
  return {
    fill: true,
    lineTension: 0.1,
    backgroundColor: brightColor.toPercentageRgbString(),
    borderColor: color.toPercentageRgbString(),
    pointHoverBackgroundColor: brightColor.toPercentageRgbString(),
    pointBorderColor: color.toPercentageRgbString(),
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 2,
    pointHitRadius: 10,
    spanGaps: false,
  };
};

const getChartJsDatasets = (datasets, countries) => {
  return datasets
    .map(datum => {
      const correspondingCountry = countries
        .find(({name}) => name === datum.label);
      if (!correspondingCountry) {
        return {};
      }
      return _.assignAll([{}, getLineConfig(correspondingCountry), datum]);
    })
    .toJS();
};

class StackedLineChart extends React.Component {
  render() {
    const {years, datasets, countries} = this.props;
    if (countries.isEmpty() || datasets.isEmpty()) {
      return null;
    }

    return (
      <Line
        data={{
          labels: years.toJS(),
          datasets: getChartJsDatasets(datasets, countries),
        }}
        options={options}
        height={100}
        redraw
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
