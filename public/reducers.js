import {List, OrderedSet} from 'immutable';
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

const suggestions = handleActions({
  [Actions.loadSuggestions]: (state, {payload}) => OrderedSet(payload),
  [Actions.clearSuggestions]: () => OrderedSet(),
}, OrderedSet());

const resorts = handleAction(
  Actions.fetchResorts,
  (state, {payload}) => payload,
  OrderedSet()
);

const years = handleAction(
  Actions.fetchYears,
  (state, {payload}) => payload,
  OrderedSet()
);

const stackedChartDatasets = handleAction(
  Actions.fetchStackedLineChartDatasets,
  (state, {payload}) => payload,
  List()
);

const doughnutChartData = handleAction(
  Actions.fetchDoughnutChartData,
  (state, {payload}) => payload,
  {labels: [], datasets: []}
);

const radarChartDatasets = handleAction(
  Actions.fetchRadarChartDatasets,
  (state, {payload}) => payload,
  List()
);

const rootReducer = combineReducers({
  countries, types, resorts, suggestions, stackedChartDatasets, isFetching,
  doughnutChartData, years, radarChartDatasets
});

export default rootReducer;
