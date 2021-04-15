# Coinifer

Coinifer distills cryptocurrency data into six buckets by fetching data from various sources and normalizing the data to a 0-100 scale.
The normalized data is used to populate a react-highcharts radar chart (the larger the surface area of the chart, the more positively metrics reflect on the asset).


### Metric Categories
The following metrics were chosen to reflect a well-rounded evaluation of each asset, including both qualitative and quantitative data. 

##### Valuation (NVT: Network Value to Transaction Value)
* NVT = current_supply / #_of_transactions_per_day x avg_transaction_value
* ratio of 150 is treated as the upperbound (yields a score of 0/100)
* ratio of 70 is treated as the lowerbound (yields a score of 100/100)

##### Current Price vs VWAP (VWAP is calculated as the average of a daily tick's high, open, close)
* score above 50 indicates current price is below the 7-day moving average VWAP 
* score below 50 indicates the current price is above the 7-day moving average VWAP

##### Volume Retention
* higher retention rate may indicate investors/speculators are trading lower proportions of the liquid market capitalization.

##### Liquidty Score
* score calculated by CoinGecko
* score influenced by bid/ask spread, volume

##### Social Score
* score calculated by CoinGecko (evaluating the asset's twitter, reddit, facebook follower base)
Developer Community

##### Developer Score
* score calculated by CoinGecko (evaluating number of commits and contributors on GitHub)

### Current API Limitations

Coinifer is current using free/community versions of API access. Number of requests per time interval may create 429 errors (too many requests), causing data to not render.
Additionally, using multiple API sources creates cross-dependency.

##### A List of Cryptocurrency APIs used:
* Messari
* CoinGecko (Developer Community, Social Score, Liquidity Score)
* CryptoCompare
* Coinmetrics


### Future Goals

Throughout this project, the use of Neo4j has been experimented. Neo4j's graph database is useful in understanding how assets are associated to other assets.
Much of the existing challenges for those trying to understand the cryptocurrency space stems for information overload and the sheer number of assets there are.
Having a way to visualize distinctions and relationships between assets may serve helpful.
