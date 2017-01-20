import _ from 'lodash/fp';
import {List} from 'immutable';
import {createAction} from 'redux-actions';

import {getDoughnutChartData} from '../api';

const getSums = (buckets, types) => {
  const getDataForEachType = type => {
    const bucketForType = _.find({key: type})(buckets);
    if (!bucketForType) {
      return [type, 0];
    }
    return [type, bucketForType.sum.value];
  };
  return _.flow([
    _.map(getDataForEachType),
    _.fromPairs,
    _.values,
  ])(types);
};

export default createAction(
  'LOAD_DOUGHNUT_CHART_DATA',
  ({types, countries}) => {
    return getDoughnutChartData({countries})
      .then(({aggregations: {type: {buckets}}}) => {
        return List(getSums(buckets, types.toJS()));
      });
  }
);
