import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          {/* The navbar will show these links after you log in */}
          <div className="navbar-brand">
            <a className="navbar-item" href="/home">
              Coinifer
              {/* <img
                src="https://bulma.io/images/bulma-logo.png"
                width="112"
                height="28"
              /> */}
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/coins/page/1" className="navbar-item">
                Top 100 Assets
              </Link>
            </div>
            <div className="navbar-start">
              <div className="navbar-item">
                <div className="buttons">
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar" role="navigation" aria-label="main navigation">
          {/* The navbar will show these links before you log in */}
          <div className="navbar-brand">
            <a className="navbar-item" href="/home">
              Coinifer
              {/* <img
                src="https://bulma.io/images/bulma-logo.png"
                width="112"
                height="28"
              /> */}
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/login" className="button is-light">
                    Login
                  </Link>
                  <Link to="/signup" className="button is-primary">
                    <strong>Sign Up</strong>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
