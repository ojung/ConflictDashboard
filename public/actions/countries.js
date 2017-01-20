import ColorScheme from 'color-scheme';
import {createActions} from 'redux-actions';

const colors = new ColorScheme()
  .from_hue(21)
  .scheme('tetrade')
  .variation('pastel')
  .colors();

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const {addCountry, removeCountry} = createActions({
  ADD_COUNTRY: name => ({name, color: getRandomColor()}),
}, 'REMOVE_COUNTRY');
