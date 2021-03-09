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
    console.log(data)
    if (data) {
      //console.log('spiderchart state', this.props.spiderChartData)
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
                  startAngle: 0,
                  endAngle: 360
                },

                xAxis: {
                  tickInterval: 45,
                  min: 0,
                  max: 360,
                  labels: {
                    format: '{value}°'
                  }
                },

                yAxis: {
                  min: 0
                },

                plotOptions: {
                  series: {
                    pointStart: 0,
                    pointInterval: 45
                  },
                  column: {
                    pointPadding: 0,
                    groupPadding: 0
                  }
                },

                series: [
                  {
                    type: 'column',
                    name: 'Column',
                    data: [8, 7, 6, 5, 4, 3, 2, 1],
                    pointPlacement: 'between'
                  },
                  {
                    type: 'line',
                    name: 'Line',
                    data: [1, 2, 3, 4, 5, 6, 7, 8]
                  },
                  {
                    type: 'area',
                    name: 'Area',
                    data: [1, 8, 2, 7, 3, 6, 4, 5]
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
        <div>asset not supported at this time</div>
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
