import React from 'react'
import {Link} from 'react-router-dom'
import CoinSpiderChart from './CoinSpiderChart'

const CoinCell = props => {
  const {crypto} = props
  console.log(crypto)
  return (
    <div id="coin-cell">
      <Link to={`/coins/${crypto.symbol}`}>
        <div>{`${crypto.name}`}</div>
      </Link>
      <CoinSpiderChart symbol={crypto.symbol} id={crypto.id} />
    </div>
  )
}
export default CoinCell
