import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {List, OrderedSet} from 'immutable';

import DoughnutChart from './DoughnutChart.jsx';
import RadarChart from './RadarChart.jsx';
import StackedLineChart from './StackedLineChart.jsx';

class Charts extends React.Component {
  componentWillMount() {
    const {years, resorts, loadStaticData} = this.props;
    if (years.isEmpty() || resorts.isEmpty()) {
      loadStaticData();
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
    resorts,
  }) {
    if (!isFetching && stackedChartDatasets.size !== countries.size) {
      loadData(countries, years, resorts);
    }
  }

  render() {
    const {
      countries,
      years,
      resorts,
      stackedChartDatasets,
      radarChartDatasets,
      doughnutChartData
    } = this.props;
    return (
      <Grid>
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
          <Col xs={6} md={6}>
            <RadarChart
              countries={countries}
              resorts={resorts}
              datasets={radarChartDatasets}
            />
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
  loadStaticData: PropTypes.func.isRequired,
};

export default Charts;
