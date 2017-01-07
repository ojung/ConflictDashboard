import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import SelectedCountriesContainer from './SelectedCountriesContainer';
import StackedChartContainer from './StackedChartContainer';

const GridLayout = () => (
  <Grid>
    <Row>
      <Col xs={6} md={12} style={{margin: 15, paddingLeft: 60}}>
        <SelectedCountriesContainer/>
      </Col>
    </Row>
    <Row>
      <Col xs={6} md={12}>
        <StackedChartContainer />
      </Col>
    </Row>
  </Grid>
);
export default GridLayout;
