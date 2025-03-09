module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Group', {
      chatId: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      adminId: {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    });
  };