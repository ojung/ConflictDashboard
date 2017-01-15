import _ from 'lodash/fp';
import {OrderedSet} from 'immutable';
import {createAction} from 'redux-actions';

import {getYears} from '../api';

const getSortedYears = _.flow([
  _.map('key_as_string'),
  _.sortBy([_.identity])
]);

export default createAction(
  'LOAD_YEARS',
  () => {
    return getYears()
      .then(({aggregations: {years: {buckets}}}) => {
        return OrderedSet(getSortedYears(buckets));
      });
  }
);
