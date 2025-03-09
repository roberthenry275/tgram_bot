const { Group } = require('../models');
const { Logging } = require('@google-cloud/logging');
const logging = new Logging();

module.exports = (bot) => {
  bot.on('new_chat_members', async (ctx) => {
    const log = logging.log('group-handler');
    try {
      if (ctx.message.new_chat_members.some(u => u.id === ctx.botInfo.id)) {
        await Group.upsert({
          chatId: ctx.chat.id,
          adminId: ctx.from.id
        });
        
        ctx.replyWithMarkdown(
          `🤖 *Bot Activated!*\n\n` +
          `Admin commands:\n` +
          `- \`/add_address <CHAIN> <ADDRESS>\`\n` +
          `- \`/update_rate <VALUE>\``
        );
        
        log.write(log.entry({
          labels: { chatId: ctx.chat.id }
        }, `Bot added to group`));
      }
    } catch (error) {
      log.write(log.entry({
        severity: 'ERROR',
        labels: { chatId: ctx.chat.id }
      }, `Group join error: ${error.message}`));
    }
  });
};