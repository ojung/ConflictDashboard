import React, {PropTypes} from 'react';
import _ from 'lodash/fp';
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

const polarConfig = {
  backgroundColor: 'rgba(179,181,198,0.2)',
  borderColor: 'rgba(179,181,198,1)',
  pointBackgroundColor: 'rgba(179,181,198,1)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgba(179,181,198,1)',
};

const getChartJsDatasets = datasets => {
  return datasets
    .map(datum => _.assignAll([{}, polarConfig, datum]))
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
          datasets: getChartJsDatasets(datasets),
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

