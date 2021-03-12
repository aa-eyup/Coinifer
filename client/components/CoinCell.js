import React from 'react'
import {Link} from 'react-router-dom'
import CoinSpiderChart from './CoinSpiderChart'

const CoinCell = props => {
  const {crypto} = props
  return (
    <section className="coin-cell">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-24x24">
                <img src={crypto.image ? crypto.image.small : crypto.thumb} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-6">
                <Link
                  to={`/coins/${crypto.symbol}/profile`}
                >{`${crypto.name}`}</Link>
              </p>
            </div>
          </div>
          <div className="card-image">
            <figure className="is-4by3">
              <CoinSpiderChart symbol={crypto.symbol} id={crypto.id} />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CoinCell
