import {createAction, createActions} from 'redux-actions';

import * as Api from './api';

export const loadSuggestions =
  createAction('LOAD_SUGGESTIONS', Api.getCountrySuggestion);

export const clearSuggestions = createAction('CLEAR_SUGGESTIONS');

export const fetchStackedLineData =
  createAction('LOAD_STACKED_CHART_DATA', Api.getStackedChartData);

export const setIsFetching = createAction('SET_IS_FETCHING');

export const {addCountry, removeCountry} = createActions('ADD_COUNTRY', 'REMOVE_COUNTRY');

export const {addType, removeType} = createActions('ADD_TYPE', 'REMOVE_TYPE');

export const {addResort, removeResort}  = createActions('ADD_RESORT', 'REMOVE_RESORT');
