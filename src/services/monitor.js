const { Address, Setting } = require('../models');
const chains = require('./blockchain');
const priceService = require('./price');
const formatter = require('../utils/formatter');
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();
const log = logging.log('transaction-monitor');

const TX_AGE_LIMIT = 60000; // 1 minute

module.exports = {
  startMonitoring: async (bot) => {
    setInterval(async () => {
      try {
        const addresses = await Address.findAll({
          include: [{
            model: Setting,
            where: { key: 'RNC_RATE' },
            required: true
          }]
        });

        for(const { chain, address, Setting, Group } of addresses) {
          try {
            const txs = await chains[chain].fetchTransactions(address);
            const latestTx = txs[0];
            
            if(latestTx && (Date.now() - latestTx.timestamp < TX_AGE_LIMIT)) {
              const price = await priceService.getTokenPrice(chain);
              const usdValue = (latestTx.value * price).toFixed(2);
              const rncAmount = (usdValue / Setting.value).toFixed(0);
              
              await bot.telegram.sendMessage(
                Group.chatId,
                formatter.createAlert({
                  chain,
                  spent: latestTx.value.toFixed(4),
                  usdValue,
                  rncAmount,
                  rate: Setting.value,
                  txHash: latestTx.hash
                }),
                { parse_mode: 'Markdown' }
              );
              
              log.write(log.entry({
                resource: { type: 'global' },
                labels: { chain, address: address.slice(-6) }
              }, `Alert sent for ${latestTx.hash}`));
            }
          } catch (chainError) {
            log.write(log.entry({
              severity: 'WARNING',
              resource: { type: 'chain' },
              labels: { chain }
            }, `Chain monitoring error: ${chainError.message}`));
          }
        }
      } catch (globalError) {
        log.write(log.entry({
          severity: 'ERROR',
          resource: { type: 'global' }
        }, `Global monitoring failure: ${globalError.message}`));
      }
    }, 30000);
  }
};