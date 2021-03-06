import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
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
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
