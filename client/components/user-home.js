import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchMessariData} from '../store/apiDataStore'

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.fetchMessariData()
  }
  render() {
    console.log(this.props.messariData[0])
    const {email} = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email,
    messariData: state.apiData.messariData
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMessariData: () => dispatch(fetchMessariData())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
