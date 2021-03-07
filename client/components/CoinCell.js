import React from 'react'
import {Link} from 'react-router-dom'
import CoinSpiderChart from './CoinSpiderChart'

const CoinCell = props => {
  const {crypto} = props
  console.log(crypto)
  return (
    <span id="coin-cell">
      <div className="card">
        <div className="card-content">
          <div className="media-content">
            <p className="title is-6">
              <Link to={`/coins/${crypto.symbol}`}>
                <div>{`${crypto.name}`}</div>
              </Link>
            </p>
          </div>
          <div className="card-image">
            <figure className="is-4by3">
              <CoinSpiderChart symbol={crypto.symbol} id={crypto.id} />
            </figure>
          </div>
        </div>
      </div>
    </span>
  )
}
export default CoinCell
