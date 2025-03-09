const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../../config/chains').PLS;

module.exports = {
  fetchTransactions: async (address) => {
    try {
      const { data } = await axios.get(`${config.explorer}/address/${address}`, {
        timeout: 15000
      });
      const $ = cheerio.load(data);
      
      return $('#transactions tbody tr').map((i, row) => ({
        hash: $(row).find('td:first-child a').text().trim(),
        value: parseFloat($(row).find('td:nth-child(3)').text()),
        timestamp: new Date($(row).find('td:nth-child(4)').text()).getTime()
      })).get();
    } catch (error) {
      console.error('PLS Error:', error.message);
      return [];
    }
  }
};