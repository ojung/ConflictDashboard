import React, {PropTypes} from 'react';
import _ from 'lodash/fp';
import tinycolor from 'tinycolor2';
import {List, OrderedSet} from 'immutable';
import {Radar} from 'react-chartjs-2';

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

const getPolarConfig = (country) => {
  const color = tinycolor(country.color);
  const brightColor = color.clone().setAlpha(0.4);
  return {
    backgroundColor: brightColor.toPercentageRgbString(),
    borderColor: color.toPercentageRgbString(),
    pointHoverBackgroundColor: color.toPercentageRgbString(),
    pointBorderColor: color.toPercentageRgbString(),
    pointHoverBorderColor: 'rgba(220,220,220,1)',
  };
};

const getChartJsDatasets = (datasets, countries) => {
  return datasets
    .map(datum => {
      const correspondingCountry = countries
        .find(({name}) => name === datum.label);
      return _.assignAll([{}, getPolarConfig(correspondingCountry), datum]);
    })
    .toJS();
};

class RadarChart extends React.Component {
  render() {
    const {datasets, countries, resorts} = this.props;
    if (countries.size <= 0) {
      return null;
    }

    return (
      <Radar
        data={{
          labels: resorts.toJS(),
          datasets: getChartJsDatasets(datasets, countries),
        }}
        options={options}
        redraw
      />
    );

  }
}

RadarChart.propTypes = {
  datasets: PropTypes.instanceOf(List).isRequired,
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
  resorts: PropTypes.instanceOf(OrderedSet).isRequired,
};

export default RadarChart;

