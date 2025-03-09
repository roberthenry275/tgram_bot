const { chains } = require('../config');

module.exports = {
  createAlert: ({ chain, spent, usdValue, rncAmount, rate, txHash }) => {
    const config = chains[chain];
    return `🔊🔊🔊 New Buy $RNC

Spent: ${spent} ${config.symbol} ($${usdValue})
Received: ${rncAmount} $RNC
Rate: ${rate} $RNC/${config.symbol}

[Transaction Details](${config.explorer}/${txHash})
    `.trim();
  }
};