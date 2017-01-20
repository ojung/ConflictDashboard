import _ from 'lodash/fp';
import {OrderedSet} from 'immutable';
import {createAction} from 'redux-actions';

import {getTypes} from '../api';

const getSortedTypes = _.flow([
  _.map('key'),
  _.sortBy([_.identity])
]);

export default createAction(
  'LOAD_TYPES',
  () => {
    return getTypes()
      .then(({aggregations: {types: {buckets}}}) => {
        return OrderedSet(getSortedTypes(buckets));
      });
  }
);

