import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading'
import {fetchSpiderChartData} from '../store/spiderChartStore'

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
    if (data) {
      //console.log('spiderchart state', this.props.spiderChartData)
      return <div>Spider Chart goes here: {this.props.symbol}</div>
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
