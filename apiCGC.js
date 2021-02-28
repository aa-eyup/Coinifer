const CoinGecko = require('coingecko-api')
const CoinGeckoClient = new CoinGecko()

const fetchMarketData = async () => {
  const data = await CoinGeckoClient.coins.fetchMarketChart('bitcoin')
  console.log(data.data.total_volumes)
}
//fetchMarketData();

// --------------------------- categories ------------------------------
// get ids of all coins and their category
// return object format { id: categoriesArrray }
const getCategories = async () => {
  let coinIdArr = []
  let categories = {}
  // CoinGecko => 6300 total coins
  const data = (await CoinGeckoClient.coins.list()).data
  data.forEach((coinObj) => coinIdArr.push(coinObj.id))
  console.log(data.length)
  // nomics =>
  //
}
//getCategories();

// ----------------------- Volume ---------------------------------------------
// volume data format: [UNIX timestep, volume in USD]
// Xweek average daily volume / Xmo avg daily volume
const dailyVolumeRatio = async (asset, ltr, str) => {
  let newDate = new Date()
  let to = Math.floor(newDate.getTime() / 1000)
  let from = Math.floor(newDate.setDate(newDate.getDate() - 91) / 1000)
  // takes in UNIX timestamp
  const data = (
    await CoinGeckoClient.coins.fetchMarketChartRange(asset, {
      from,
      to,
    })
  ).data
  let volumes = data.total_volumes
  let longTermVolumes = volumes.slice(volumes.lenght - ltr)
  let shortTermVolumes = volumes.slice(volumes.length - str)

  let longTermDailyAvg =
    longTermVolumes.reduce((acc, subArr) => subArr[1] + acc, 0) / ltr

  let shortTermDailyAvg =
    shortTermVolumes.reduce((acc, subArr) => subArr[1] + acc, 0) / str

  let ratio = +Number.parseFloat(
    shortTermDailyAvg / longTermDailyAvg
  ).toPrecision(3)
  console.log(ratio)
  return ratio
}
//dailyVolumeRatio('bitcoin', 30, 7);

// -------------------------- 1 week price change -------------------------

// -------------------- Exchange Data --------------------------------------
// # of exchanges assets are traded on

// ------------------------- fetch Single Coin --------------------------------------
// block time, hashing algo, categories

// description property
// .description.en => ?innetHTML format?
// image property
/*
thumb, small, large
*/

// market_data property
/*
market_cap_rank
*/

// community_data property
/*
facebook_likes: null,
twitter_followers: 46593,
reddit_average_posts_48h: 8.273,
reddit_average_comments_48h: 118.727,
reddit_subscribers: 21932,
reddit_accounts_active_48h: 635,
telegram_channel_user_count: 10909
*/

// developer_data property
/*
forks: 494,
stars: 706,
subscribers: 204,
total_issues: 335,
closed_issues: 239,
pull_requests_merged: 414,
pull_request_contributors: 35,
code_additions_deletions_4_weeks: [Object],
commit_count_4_weeks: 0,
last_4_weeks_commit_activity_series: []
*/

// Other properties
/*
genesis_date: '2018-01-03',

sentiment_votes_up_percentage: 66.93,
developer_score: 68.815,
community_score: 53.554,

market_cap_rank: 64,
coingecko_rank: 21,
coingecko_score: 58.351,

liquidity_score: 70.007,

public_interest_score: 0.018,
public_interest_stats: { alexa_rank: 226414, bing_matches: null },
*/

const fetchCoin = async (asset) => {
  const data = await CoinGeckoClient.coins.fetch(asset, {})
  console.log(' --------------- coins.fetch single coin -----------------')
  console.log(data)
}
fetchCoin('ravencoin')

// ------------------------- Coins List --------------------------------------
// throttle limit breached -> how to get thhis data all at once?
// data = (await CoinGeckoClient.coins.list()).data;

// ------------------------- All Coins --------------------------------------
// total supply vs. circulating supply
// *** only top 50 by mkt cap
const allCoins = async () => {
  const data = (await CoinGeckoClient.coins.all()).data
  console.log(' ---------------- All Coins ----------------')
  console.log(data.length)
  console.log(data.map((coinObj) => coinObj.id))
}
//allCoins();
