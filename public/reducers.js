import {OrderedSet} from 'immutable';
import {combineReducers} from 'redux';
import {handleAction, handleActions} from 'redux-actions';

import * as Actions from './actions/';

const isFetching = handleAction(
  Actions.setIsFetching,
  (state, {payload: isFetching}) => isFetching,
  false
);

const countries = handleActions({
  [Actions.addCountry]: (state, {payload: country}) => state.add(country),
  [Actions.removeCountry]: (state, {payload: country}) => state.remove(country),
}, OrderedSet());

const types = handleActions({
  [Actions.addType]: (state, {payload: type}) => state.add(type),
  [Actions.removeType]: (state, {payload: type}) => state.remove(type),
}, OrderedSet());

const resorts = handleActions({
  [Actions.addResort]: (state, {payload: resort}) => state.add(resort),
  [Actions.removeResort]: (state, {payload: resort}) => state.remove(resort),
}, OrderedSet());

const suggestions = handleActions({
  [Actions.loadSuggestions]: (state, {payload}) => OrderedSet(payload),
  [Actions.clearSuggestions]: () => OrderedSet(),
}, OrderedSet());

const stackedChartData = handleAction(
  Actions.fetchStackedLineChartData,
  (state, {payload}) => payload,
  {labels: [], datasets: []}
);

const rootReducer = combineReducers({
  countries, types, resorts, suggestions, stackedChartData, isFetching
});

export default rootReducer;
