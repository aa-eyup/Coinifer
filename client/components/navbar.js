import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    <section className="is-light hero">
      <div className="hero-head">
        <div className="columns is-marginless heading has-text-weight-bold">
          <div className="column left">
            {/* burger-menu/drop down for mobile view */}

            {/* burger-menu/drop down for mobile view */}
            <figure className="navbar-item image desktop">
              <img
                src="/logo-placeholder.png"
                style={{width: '6.25rem', height: '2rem'}}
              />
            </figure>
            <Link
              to="/trending"
              className="navbar-item center has-text-black desktop"
            >
              <p>Trending Today</p>
            </Link>
            <Link
              to="/coins/page/1"
              className="navbar-item center has-text-black desktop"
            >
              <p>Top 100 Assets</p>
            </Link>
          </div>
          {isLoggedIn ? (
            <div className="column center">
              <p>search bar goes here</p>
            </div>
          ) : (
            ''
          )}
          <div className="column right">
            <Link
              to="/about"
              className="navbar-item right has-text-black desktop"
            >
              <p>About Coinifer</p>
            </Link>
            {isLoggedIn ? (
              <a
                className="navbar-item right has-text-black desktop"
                href="#"
                onClick={handleClick}
              >
                Logout
              </a>
            ) : (
              <>
                <Link
                  to="/about"
                  className="navbar-item has-text-black desktop"
                >
                  <p>About Coinifer</p>
                </Link>
                <Link
                  to="/login"
                  className="navbar-item has-text-black desktop"
                >
                  <p>Login</p>
                </Link>
                <Link
                  to="/signup"
                  className="navbar-item button is-primary desktop"
                >
                  <strong>Sign Up</strong>
                </Link>
              </>
            )}
            {/* <figure className="navbar-item image has-text-black center">
                <i
                className="fas fa-bars"
                style={{width: '1rem', height: '1rem'}}
                ></i>
              </figure> */}
          </div>
        </div>
      </div>
    </section>
    <hr className="line-break" />
  </nav>
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
