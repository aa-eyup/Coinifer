// SOME COINS FROM COINPAPER MAY NOT HAVE DATA FROM MESSARI
// (MESSAR DATA WILL BE USED FOR SINGLE VIEW)

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchMessariSingleCoin} from '../store/apiDataStore'

class CryptoSingle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // get id from props.match.params (should be coinpaper .symbol -> .toLowercase())
    console.log('single componentDidMount')
    const id = this.props.match.params.coinpaperId.toLowerCase()
    this.props.fetchMessariSingleCoin(id)
  }
  render() {
    console.log(this.props.messariSingleCoin)
    return <div></div>
  }
}

const mapState = state => {
  return {
    messariSingleCoin: state.apiData.messariSingleCoin
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMessariSingleCoin: id => dispatch(fetchMessariSingleCoin(id))
  }
}
export default connect(mapState, mapDispatch)(CryptoSingle)
