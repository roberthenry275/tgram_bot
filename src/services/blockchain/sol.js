const axios = require('axios');
const config = require('../../config/chains').SOL;

module.exports = {
  fetchTransactions: async (address) => {
    try {
      const response = await axios.get(`${config.apiUrl}/account/transactions/${address}`, {
        timeout: 10000
      });
      
      return response.data.data.map(tx => ({
        hash: tx.txHash,
        value: Math.abs(tx.changeAmount) / Math.pow(10, config.decimals),
        timestamp: new Date(tx.blockTime * 1000).getTime()
      }));
    } catch (error) {
      console.error('SOL Error:', error.message);
      return [];
    }
  }
};