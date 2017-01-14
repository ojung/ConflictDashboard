import {createAction} from 'redux-actions';

import {getCountrySuggestion} from '../api';

const loadSuggestions = createAction(
  'LOAD_SUGGESTIONS',
  input => {
    return getCountrySuggestion(input)
      .then(({aggregations: {distinct_countries: {buckets}}}) => buckets);
  }
);
export default loadSuggestions;