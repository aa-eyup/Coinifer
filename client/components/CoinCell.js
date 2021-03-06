import React from 'react'
import {Link} from 'react-router-dom'

class CryptoBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const {crypto} = this.props
    return (
      <Link to={`/coins/${crypto.symbol}`}>
        <div>{`${crypto.name}`}</div>
      </Link>
    )
  }
}

export default CryptoBlock
