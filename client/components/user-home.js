import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Trending from './Trending'

const UserHome = () => {
  return <Trending />
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)
