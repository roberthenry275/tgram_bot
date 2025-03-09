module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Setting', {
      key: {
        type: DataTypes.STRING,
        primaryKey: true,
        validate: {
          isIn: [['RNC_RATE']]
        }
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isFloat: true
        }
      }
    });
  };