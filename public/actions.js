import {createAction, createActions} from 'redux-actions';

import * as Api from './api';

export const loadSuggestions = createAction('LOAD_SUGGESTIONS', input => {
  return Api.getCountrySuggestion(input);
});

export const {addCountry, removeCountry} = createActions('ADD_COUNTRY', 'REMOVE_COUNTRY');

export const addType = createAction('ADD_TYPE');
export const removeType = createAction('REMOVE_TYPE');

export const addResort = createAction('ADD_RESORT');
export const removeResort = createAction('REMOVE_RESORT');
