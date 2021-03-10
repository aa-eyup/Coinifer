import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const UserHome = () => {}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)
