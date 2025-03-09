const { Logging } = require('@google-cloud/logging');
const logging = new Logging();
const log = logging.log('error-handler');

module.exports = (bot) => {
  bot.catch((err, ctx) => {
    log.write(log.entry({
      severity: 'ERROR',
      labels: {
        chatId: ctx.chat?.id,
        userId: ctx.from?.id
      }
    }, `Unhandled error: ${err.stack}`));
    
    ctx.replyWithMarkdown('⚠️ *System Error*\nOur team has been notified');
  });

  process.on('unhandledRejection', (reason) => {
    log.write(log.entry({
      severity: 'CRITICAL'
    }, `Unhandled rejection: ${reason}`));
  });

  process.on('uncaughtException', (error) => {
    log.write(log.entry({
      severity: 'EMERGENCY'
    }, `Fatal error: ${error.stack}`));
    process.exit(1);
  });
};