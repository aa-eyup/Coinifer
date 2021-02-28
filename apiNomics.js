const Nomics = require('nomics');
const NomicsClient = new Nomics({
  apiKey: '5212b362097b2d261b6d5b4fedac3d15',
});

const getCurrencies = async () => {
  const data = await NomicsClient.currenciesTicker();
  console.log(data);
};
getCurrencies();
