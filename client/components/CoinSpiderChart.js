import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchSpiderChartData} from '../store/spiderChartStore'

class SpiderChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    if (!this.props.spiderChartData[this.props.symbol]) {
      this.props.fetchSpiderChartData(this.props.symbol, this.props.id)
    }
  }
  render() {
    const data = this.props.spiderChartData[this.props.symbol]
    if (data) {
      //console.log('spiderchart state', this.props.spiderChartData)
      return <div>Spider Chart goes here: {this.props.symbol}</div>
    } else {
      return <div>loading chart...</div>
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
