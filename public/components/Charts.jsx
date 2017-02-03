import Immutable from 'immutable';
import React, {PropTypes} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {List, OrderedSet} from 'immutable';

import PieChart from './PieChart.jsx';
import RadarChart from './RadarChart.jsx';
import StackedLineChart from './StackedLineChart.jsx';

class Charts extends React.Component {
  componentWillMount() {
    const {years, resorts, types, loadStaticData} = this.props;
    if (years.isEmpty() || resorts.isEmpty() || types.isEmpty()) {
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
    types,
  }) {
    if (!isFetching && stackedChartDatasets.size !== countries.size) {
      loadData(countries, years, resorts, types);
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      countries: nextCountries,
      stackedChartDatasets: nextStackedChartDatasets,
      radarChartDatasets: nextRadarChartDatasets,
      pieChartDatasets: nextPieChartDatasets,
    } = nextProps;

    return !Immutable.is(this.countries, nextCountries) ||
      !Immutable.is(this.stackedChartDatasets, nextStackedChartDatasets) ||
      !Immutable.is(this.radarChartDatasets, nextRadarChartDatasets) ||
      !Immutable.is(this.pieChartDatasets, nextPieChartDatasets);
  }

  render() {
    const {
      countries,
      years,
      resorts,
      types,
      stackedChartDatasets,
      radarChartDatasets,
      pieChartDatasets,
    } = this.props;

    this.countries = countries;
    this.stackedChartDatasets = stackedChartDatasets;
    this.radarChartDatasets = radarChartDatasets;
    this.pieChartDatasets = pieChartDatasets;

    return (
      <Grid>
        <hr />
        <h4>Ausgaben der ausgewählten Länder von 2004 bis 2014</h4>
        <br />
        <Row>
          <Col xs={12} md={12}>
            <StackedLineChart
              years={years}
              datasets={stackedChartDatasets}
              countries={countries}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={6} md={6}>
            <h4>Ausgaben pro Typ</h4>
            <br />
            <PieChart
              datasets={pieChartDatasets}
              countries={countries}
              types={types}
            />
          </Col>
          <Col xs={6} md={6}>
            <h4>Ausgaben pro Land pro Resort der Bundesregierung</h4>
            <br />
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
  pieChartDatasets: PropTypes.instanceOf(List).isRequired,
  radarChartDatasets: PropTypes.instanceOf(List).isRequired,
  loadStaticData: PropTypes.func.isRequired,
};

export default Charts;
