import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchMessariData} from '../store/apiDataStore'

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchMessariData()
  }

  render() {
    console.log(this.props.messariData)
    return <div>Hello from Grid</div>
  }
}

const mapState = state => {
  return {
    messariData: state.apiData.messariData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMessariData: () => dispatch(fetchMessariData())
  }
}

export default connect(mapState, mapDispatch)(Grid)
