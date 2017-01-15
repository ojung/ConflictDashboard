import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {List, OrderedSet} from 'immutable';

import DoughnutChart from './DoughnutChart.jsx';
import SelectedCountriesContainer from './SelectedCountriesContainer';
import StackedLineChart from './StackedLineChart.jsx';

class Charts extends React.Component {
  componentWillMount() {
    const {years, loadYears} = this.props;
    if (years.isEmpty()) {
      loadYears();
      return null;
    }
    this.loadIfNecessary(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.loadIfNecessary(nextProps);
  }

  loadIfNecessary({
    stackedChartDatasets,
    countries,
    loadData,
    isFetching,
    years,
  }) {
    if (!isFetching && stackedChartDatasets.size !== countries.size) {
      loadData(countries, years);
    }
  }

  render() {
    const {
      countries,
      years,
      stackedChartDatasets,
      doughnutChartData
    } = this.props;
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12} style={{margin: 15, paddingLeft: 60}}>
            <SelectedCountriesContainer />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <StackedLineChart
              years={years}
              datasets={stackedChartDatasets}
              countries={countries}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={6}>
            <DoughnutChart data={doughnutChartData} countries={countries} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Charts.propTypes = {
  countries: PropTypes.instanceOf(OrderedSet).isRequired,
  stackedChartDatasets: PropTypes.instanceOf(List).isRequired,
  years: PropTypes.instanceOf(OrderedSet).isRequired,
  doughnutChartData: PropTypes.object.isRequired,
  loadYears: PropTypes.func.isRequired,
};

export default Charts;
