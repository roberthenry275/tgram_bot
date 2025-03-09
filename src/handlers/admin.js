const { Address, Setting } = require('../models');
const { isAdmin, validateAddress } = require('../utils/validators');
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();

module.exports = (bot) => {
  bot.command('add_address', async (ctx) => {
    const log = logging.log('admin-handler');
    const metadata = { 
      labels: { 
        chatId: ctx.chat.id,
        userId: ctx.from.id 
      } 
    };

    try {
      if (!await isAdmin(ctx)) {
        log.write(log.entry(metadata, 'Unauthorized access attempt'));
        return ctx.reply('❌ Admin privileges required');
      }

      const [_, chain, address] = ctx.message.text.split(' ');
      if (!chain || !address) {
        return ctx.reply('⚠️ Format: /add_address <CHAIN> <ADDRESS>');
      }

      if (!validateAddress(chain, address)) {
        log.write(log.entry(metadata, `Invalid address: ${address}`));
        return ctx.reply('❌ Invalid address format');
      }

      await Address.upsert({
        chain: chain.toUpperCase(),
        address: address.toLowerCase(),
        GroupChatId: ctx.chat.id
      });

      ctx.replyWithMarkdown(`✅ *${chain.toUpperCase()} address added*`);
      log.write(log.entry(metadata, `Address added: ${address}`));

    } catch (error) {
      log.write(log.entry(
        { ...metadata, severity: 'ERROR' },
        `Add address failed: ${error.message}`
      ));
      ctx.reply('⚠️ Server error. Contact support');
    }
  });

  // Similar secure implementation for update_rate command
};