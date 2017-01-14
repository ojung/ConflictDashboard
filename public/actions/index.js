import {createAction, createActions} from 'redux-actions';

import fetchStackedLineChartData from './fetchStackedLineChartData';
import loadSuggestions from './loadSuggestions';

export {fetchStackedLineChartData, loadSuggestions};

export const clearSuggestions = createAction('CLEAR_SUGGESTIONS');

export const setIsFetching = createAction('SET_IS_FETCHING');

export const {addCountry, removeCountry} =
  createActions('ADD_COUNTRY', 'REMOVE_COUNTRY');

export const {addType, removeType} =
  createActions('ADD_TYPE', 'REMOVE_TYPE');

export const {addResort, removeResort}  =
  createActions('ADD_RESORT', 'REMOVE_RESORT');
