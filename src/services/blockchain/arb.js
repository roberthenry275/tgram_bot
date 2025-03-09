const axios = require('axios');
const config = require('../../config/chains').ARB;

module.exports = {
  fetchTransactions: async (address) => {
    try {
      const response = await axios.get(config.apiUrl, {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          apikey: process.env[config.apiKeyEnv],
          sort: 'desc',
          offset: 1
        },
        timeout: 10000
      });
      
      return response.data.result.map(tx => ({
        hash: tx.hash,
        value: tx.value / Math.pow(10, config.decimals),
        timestamp: parseInt(tx.timeStamp) * 1000
      }));
    } catch (error) {
      console.error('ARB Error:', error.message);
      return [];
    }
  }
};