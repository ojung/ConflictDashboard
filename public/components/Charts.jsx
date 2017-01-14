import React, {PropTypes} from 'react';
import _ from 'lodash/fp';
import {Grid, Row, Col} from 'react-bootstrap';
import {OrderedSet} from 'immutable';

import SelectedCountriesContainer from './SelectedCountriesContainer';
import StackedChart from './StackedChart.jsx';

class Charts extends React.Component {
  componentWillMount() {
    this.loadIfNecessary(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadIfNecessary(nextProps);
  }

  loadIfNecessary(props) {
    const {stackedChartData, countries, loadData, isFetching} = props;
    const labels = OrderedSet(_.map('label', stackedChartData.datasets)).sort();
    const sortedCountries = countries.sort();
    if (!isFetching && labels.size !== sortedCountries.size) {
      loadData(countries);
    }
  }

  render() {
    const {countries, stackedChartData} = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12} style={{margin: 15, paddingLeft: 60}}>
            <SelectedCountriesContainer />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <StackedChart data={stackedChartData} countries={countries} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Charts.propTypes = {
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
  stackedChartData: PropTypes.object.isRequired,
};

export default Charts;
