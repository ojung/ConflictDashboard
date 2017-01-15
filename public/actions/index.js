import ColorScheme from 'color-scheme';
import {createAction, createActions} from 'redux-actions';

import fetchStackedLineChartDatasets from './fetchStackedLineChartDatasets';
import fetchRadarChartDatasets from './fetchRadarChartDatasets';
import fetchDoughnutChartData from './fetchDoughnutChartData';
import loadSuggestions from './loadSuggestions';
import fetchYears from './fetchYears';
import fetchResorts from './fetchResorts';

export {
  fetchStackedLineChartDatasets,
  fetchRadarChartDatasets,
  loadSuggestions,
  fetchDoughnutChartData,
  fetchYears,
  fetchResorts,
};

const colors = new ColorScheme()
  .from_hue(21)
  .scheme('tetrade')
  .colors();

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const clearSuggestions = createAction('CLEAR_SUGGESTIONS');

export const setIsFetching = createAction('SET_IS_FETCHING');

export const {addCountry, removeCountry} = createActions({
  ADD_COUNTRY: name => ({name, color: getRandomColor()}),
}, 'REMOVE_COUNTRY');

export const {addType, removeType} =
  createActions('ADD_TYPE', 'REMOVE_TYPE');

export const {addResort, removeResort}  =
  createActions('ADD_RESORT', 'REMOVE_RESORT');
