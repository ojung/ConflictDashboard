import _ from 'lodash/fp';
import {createAction} from 'redux-actions';

import {getDoughnutChartData} from '../api';

export default createAction(
  'LOAD_DOUGHNUT_CHART_DATA',
  filters => {
    return getDoughnutChartData(filters)
      .then(({aggregations: {resort: {buckets}}}) => {
        const labels = _.map('key')(buckets);
        const datasets = [{
          data: _.map('sum.value')(buckets),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }];
        return {labels, datasets};
      });
  }
);
