const { Sequelize } = require('sequelize');
const config = require('../config/chains');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true } : false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const models = {
  Address: require('./Address')(sequelize),
  Group: require('./Group')(sequelize),
  Setting: require('./Setting')(sequelize)
};

models.Group.hasMany(models.Address);
models.Group.hasMany(models.Setting);
models.Address.belongsTo(models.Group);
models.Setting.belongsTo(models.Group);

module.exports = { sequelize, ...models };