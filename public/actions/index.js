import {createAction, createActions} from 'redux-actions';

import fetchStackedLineChartDatasets from './fetchStackedLineChartDatasets';
import fetchRadarChartDatasets from './fetchRadarChartDatasets';
import fetchDoughnutChartDatasets from './fetchDoughnutChartDatasets';
import loadSuggestions from './loadSuggestions';
import fetchYears from './fetchYears';
import fetchTypes from './fetchTypes';
import fetchResorts from './fetchResorts';
import {addCountry, removeCountry} from './countries';

export {
  fetchStackedLineChartDatasets,
  fetchRadarChartDatasets,
  loadSuggestions,
  fetchDoughnutChartDatasets,
  fetchYears,
  fetchTypes,
  fetchResorts,
  addCountry,
  removeCountry,
};

export const clearSuggestions = createAction('CLEAR_SUGGESTIONS');

export const setIsFetching = createAction('SET_IS_FETCHING');

export const {addType, removeType} =
  createActions('ADD_TYPE', 'REMOVE_TYPE');

export const {addResort, removeResort}  =
  createActions('ADD_RESORT', 'REMOVE_RESORT');
