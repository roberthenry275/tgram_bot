const axios = require('axios');
const cmcIds = require('../config/cmc_ids');
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();

module.exports = {
  getTokenPrice: async (symbol) => {
    const log = logging.log('price-service');
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
        headers: { 
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
          'Accept-Encoding': 'gzip'
        },
        params: { id: cmcIds[symbol] },
        timeout: 5000
      });
      
      const price = response.data.data[cmcIds[symbol]].quote.USD.price;
      log.write(log.entry({ severity: 'INFO' }, `Price fetched: ${symbol} $${price}`));
      return price;
    } catch (error) {
      log.write(log.entry({ severity: 'ERROR' }, `Price Error: ${error.message}`));
      return 0;
    }
  }
};