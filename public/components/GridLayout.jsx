import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import SelectedCountriesContainer from './SelectedCountriesContainer';

const GridLayout = () => (
  <Grid>
    <Row>
      <Col xs={6} md={12}><SelectedCountriesContainer /></Col>
    </Row>
  </Grid>
);
export default GridLayout;
