import Please from 'pleasejs';
import {createActions} from 'redux-actions';

let colorCache = [];
const getRandomColor = () => {
  const color = Please.make_color()[0];
  colorCache = [...colorCache, color];
  return color;
};

export const {addCountry, addCountries, removeCountry} = createActions({
  ADD_COUNTRY: name => ({name, color: getRandomColor()}),
  ADD_COUNTRIES: names => {
    return names.map(name => ({name, color: getRandomColor()}));
  }
}, 'REMOVE_COUNTRY');
