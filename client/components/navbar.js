import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    {isLoggedIn ? (
      <section className="hero">
        <div className="hero-head">
          <div className="columns is-mobile is-marginless heading has-text-weight-bold">
            <div className="column left">
              {/* <figure className="navbar-item image has-text-black center mobile">
                <i
                  className="fas fa-bars"
                  style={{width: '1.5rem', height: '1.5rem'}}
                ></i>
              </figure> */}
              <a href="/trending" className="navbar-item">
                <figure className="image">
                  <img
                    src="/logo-placeholder.png"
                    style={{width: '6.25rem', height: '2rem'}}
                  />
                </figure>
              </a>
            </div>
            <div className="column center buttons">
              <Link to="/coins/page/1" className="navbar-item center button">
                <p>Top 100 Assets</p>
              </Link>
            </div>
            <div className="column right">
              <Link to="/about" className="navbar-item right has-text-black">
                <p>About Coinifer</p>
              </Link>
              <a
                className="navbar-item right has-text-black"
                href="#"
                onClick={handleClick}
              >
                Logout
              </a>
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
    ) : (
      <section className="hero">
        <div className="hero-head">
          <div className="columns is-mobile is-marginless heading has-text-weight-bold">
            <div className="column left">
              <a href="/trending" className="navbar-item desktop">
                <figure className="image">
                  <img
                    src="/logo-placeholder.png"
                    style={{width: '6.25rem', height: '2rem'}}
                  />
                </figure>
              </a>
            </div>
            <div className="column center buttons desktop">
              <Link to="/coins/page/1" className="navbar-item center button">
                <p>Top 100 Assets</p>
              </Link>
            </div>
            <div className="column right buttons">
              <Link to="/login" className="button is-light">
                <p>Login</p>
              </Link>
              <Link to="/signup" className="button is-primary">
                <strong>Sign Up</strong>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )}
    <hr />
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
