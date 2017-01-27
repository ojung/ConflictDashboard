import randomColor from 'randomColor';
import {createActions} from 'redux-actions';

let colorCache = [];
const getRandomColor = () => {
  const color = randomColor();
  colorCache = [...colorCache, color];
  return color;
};

export const {addCountry, removeCountry} = createActions({
  ADD_COUNTRY: name => ({name, color: getRandomColor()}),
}, 'REMOVE_COUNTRY');
