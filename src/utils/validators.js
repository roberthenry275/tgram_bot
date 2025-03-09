const { Group } = require('../models');
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();

module.exports = {
  isAdmin: async (ctx) => {
    try {
      const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id);
      return admins.some(a => a.user.id === ctx.from.id);
    } catch (error) {
      logging.log('auth').write(logging.entry({
        severity: 'WARNING',
        labels: { chatId: ctx.chat?.id }
      }, `Admin check failed: ${error.message}`));
      return false;
    }
  },

  validateAddress: (chain, address) => {
    const validators = {
      ETH: /^0x[a-f0-9]{40}$/i,
      BSC: /^0x[a-f0-9]{40}$/i,
      ARB: /^0x[a-f0-9]{40}$/i,
      SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
      PLS: /^0x[a-f0-9]{40}$/i
    };
    return validators[chain]?.test(address);
  }
};