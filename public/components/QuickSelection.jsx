import React, {PropTypes} from 'react';
import _ from 'lodash/fp';
import {DropdownButton, MenuItem} from 'react-bootstrap';

const REGIONS = {
  'Mittelamerika': ['Mexiko', 'Guatemala', 'El Salvador', 'Nicaragua'],
  'Südamerika': ['Kolumbien', 'Ecuador', 'Brasilien', 'Peru', 'Bolivien', 'Chile'],
  'Südostasien': [
    'Indonesien', 'Kambodscha', 'Laos', 'Malaysia', 'Myanmar',
    'Philippinen', 'Thailand', 'Vietnam',
  ],
  'Ostasien': ['China', 'Südkorea', 'Mongolei'],
  'Südasien': ['Afghanistan', 'Indien', 'Nepal', 'Pakistan', 'Sri Lanka'],
  'Zentralasien': ['Kirgisistan', 'Tadschikistan'],
  'Westasien': [
    'Armenien', 'Ägypten', 'Aserbaidschan', 'Georgien', 'Israel', 'Jemen',
    'Jordanien', 'Libanon', 'Palestinian Territories'
  ],
  'Nahost': ['Israel', 'Jordanien', 'Libanon', 'Ägypten', 'Palestinian Territories'],
};

const getMenuItems = addQuickSelection => {
  const getMenuItem = (region, countries) => (
    <MenuItem key={region} onClick={() => addQuickSelection(countries)}>
      {region}
    </MenuItem>
  );
  return _.flow([
    _.toPairs,
    _.map(tuple => getMenuItem(tuple[0], tuple[1])),
  ])(REGIONS);
};

const QuickSelection = ({onClick}) => (
  <DropdownButton title="Filter" id="dropdown-size-medium" style={{
    backgroundColor: '#f8f8f8',
  }}>
    {getMenuItems(onClick)}
  </DropdownButton>
);

QuickSelection.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default QuickSelection;
