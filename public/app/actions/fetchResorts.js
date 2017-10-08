import _ from 'lodash/fp';
import {OrderedSet} from 'immutable';
import {createAction} from 'redux-actions';

import {getResorts} from '../api';

const getSortedResorts = _.flow([
  _.sortBy(['doc_count']),
  _.reverse,
  _.take(5),
  _.map('key'),
  _.sortBy([_.identity])
]);

export default createAction(
  'LOAD_RESORTS',
  () => {
    return getResorts()
      .then(({aggregations: {resorts: {buckets}}}) => {
        return OrderedSet(getSortedResorts(buckets));
      });
  }
);

