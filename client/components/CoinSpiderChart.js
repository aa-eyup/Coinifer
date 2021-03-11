import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading'
import {fetchSpiderChartData} from '../store/spiderChartStore'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsReact from 'highcharts-react-official'
import Exporting from 'highcharts/modules/exporting'
//Exporting(Highcharts)
HighchartsMore(Highcharts)

class SpiderChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataAvailable: true
    }
  }
  componentDidMount() {
    // do not send API request if already in state
    if (!this.props.spiderChartData[this.props.symbol]) {
      this.props.fetchSpiderChartData(this.props.symbol, this.props.id)
    }
    if (this.state.dataAvailable) {
      this.timer = setTimeout(
        () =>
          this.setState(state => ({
            ...state,
            dataAvailable: !state.dataAvailable
          })),
        5000
      )
    }
  }

  render() {
    const data = this.props.spiderChartData[this.props.symbol]
    if (data) {
      return (
        <figure className="highcharts-figure">
          <div className="container">
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                chart: {
                  polar: true
                },
                title: {
                  text: `${this.props.symbol}`
                },
                pane: {
                  size: '80%'
                },
                xAxis: {
                  categories: [
                    'Valuation',
                    'Volume Retention',
                    'Liquidity',
                    'Community',
                    'Development'
                  ],
                  tickmarkPlacement: 'on',
                  lineWidth: 0
                },
                yAxis: {
                  min: 0,
                  max: 100
                },
                tooltip: {
                  shared: true,
                  pointFormat:
                    '<span style="color:{series.color}"><b>{point.y:,.0f}</b><br/>'
                },
                plotOptions: {
                  column: {
                    pointPadding: 0,
                    groupPadding: 0
                  }
                },
                //
                series: [
                  {
                    type: 'area',
                    showInLegend: false,
                    data: [
                      data.nvtScore,
                      data.retentionScore,
                      data.liquidityScore,
                      data.communityScore,
                      data.developmentScore
                    ]
                  }
                ]
              }}
            />
          </div>
        </figure>
      )
    } else {
      return this.state.dataAvailable ? (
        <div className="center">
          <ReactLoading
            type="cubes"
            color="rgb(36, 225, 96)"
            height={25}
            width={50}
          />
        </div>
      ) : (
        <div>polar chart not supported at this time</div>
      )
    }
  }
}

const mapState = state => {
  return {
    spiderChartData: state.spiderChartData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSpiderChartData: (symbol, id) =>
      dispatch(fetchSpiderChartData(symbol, id))
  }
}

export default connect(mapState, mapDispatch)(SpiderChart)
