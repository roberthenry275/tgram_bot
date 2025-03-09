require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const { sequelize } = require('./models');
const handlers = require('./handlers');
const monitor = require('./services/monitor');
const { getSecret } = require('./utils/helpers');

const app = express();
app.get('/_ah/health', (req, res) => res.status(200).send('OK'));

const initialize = async () => {
  try {
    // Google Cloud Secret Manager integration
    process.env.BOT_TOKEN = await getSecret('BOT_TOKEN');
    process.env.DATABASE_URL = await getSecret('DATABASE_URL');

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const PORT = process.env.PORT || 8080;

    // Register handlers
    bot.use(handlers.errorHandler);
    handlers.admin(bot);
    handlers.tracking(bot);

    // Start services
    monitor.startMonitoring(bot);
    app.listen(PORT, () => console.log(`Health check: ${PORT}`));
    
    bot.launch();
    console.log('🚀 Production bot started');

  } catch (error) {
    console.error('❌ Boot failed:', error);
    process.exit(1);
  }
};

initialize();