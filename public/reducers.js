import {List, OrderedSet} from 'immutable';
import {combineReducers} from 'redux';
import {handleAction, handleActions} from 'redux-actions';

import * as Actions from './actions/';

const getReducerMap = (name) => ({
  next: (state, {payload}) => {
    return payload;
  },
  throw: (state, {payload}) => {
    console.error('Got an error trying to ' + name + '.', payload);
    return state;
  }
});

const isFetching = handleAction(
  Actions.setIsFetching,
  (state, {payload: isFetching}) => isFetching,
  false
);

const countries = handleActions({
  [Actions.addCountry]: (state, {payload: country}) => {
    if (state.find(existingCountry => existingCountry.name === country.name)) {
      return state;
    }
    return state.add(country);
  },
  [Actions.addCountries]: (state, {payload: countries}) => {
    const deduplicatdCountries = countries
      .filter(country => !state.find(existingCountry => existingCountry.name === country.name));
    return state.union(deduplicatdCountries);
  },
  [Actions.removeCountry]: (state, {payload: country}) => state.remove(country),
}, OrderedSet());

const types = handleAction(
  Actions.fetchTypes,
  getReducerMap('fetchTypes'),
  OrderedSet()
);

const suggestions = handleActions({
  [Actions.loadSuggestions]: (state, {payload}) => OrderedSet(payload),
  [Actions.clearSuggestions]: () => OrderedSet(),
}, OrderedSet());

const resorts = handleAction(
  Actions.fetchResorts,
  getReducerMap('fetchResorts'),
  OrderedSet()
);

const years = handleAction(
  Actions.fetchYears,
  getReducerMap('fetchYears'),
  OrderedSet()
);

const stackedChartDatasets = handleAction(
  Actions.fetchStackedLineChartDatasets,
  getReducerMap('fetchStackedLineChartDatasets'),
  List()
);

const doughnutChartDatasets = handleAction(
  Actions.fetchDoughnutChartDatasets,
  getReducerMap('fetchDoughnutChartDatasets'),
  List()
);

const radarChartDatasets = handleAction(
  Actions.fetchRadarChartDatasets,
  getReducerMap('fetchRadarChartDatasets'),
  List()
);

const rootReducer = combineReducers({
  countries, types, resorts, suggestions, stackedChartDatasets, isFetching,
  doughnutChartDatasets, years, radarChartDatasets
});

export default rootReducer;
