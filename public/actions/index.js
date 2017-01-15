import {createAction, createActions} from 'redux-actions';

import fetchStackedLineChartDatasets from './fetchStackedLineChartDatasets';
import fetchDoughnutChartData from './fetchDoughnutChartData';
import loadSuggestions from './loadSuggestions';
import fetchYears from './fetchYears';

export {
  fetchStackedLineChartDatasets,
  loadSuggestions,
  fetchDoughnutChartData,
  fetchYears
};

export const clearSuggestions = createAction('CLEAR_SUGGESTIONS');

export const setIsFetching = createAction('SET_IS_FETCHING');

export const {addCountry, removeCountry} =
  createActions('ADD_COUNTRY', 'REMOVE_COUNTRY');

export const {addType, removeType} =
  createActions('ADD_TYPE', 'REMOVE_TYPE');

export const {addResort, removeResort}  =
  createActions('ADD_RESORT', 'REMOVE_RESORT');
