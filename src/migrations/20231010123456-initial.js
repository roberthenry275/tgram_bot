module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Groups', {
        chatId: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          allowNull: false
        },
        adminId: {
          type: Sequelize.BIGINT,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      });
  
      await queryInterface.createTable('Addresses', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        chain: {
          type: Sequelize.STRING,
          allowNull: false
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        GroupChatId: {
          type: Sequelize.BIGINT,
          references: {
            model: 'Groups',
            key: 'chatId'
          },
          onDelete: 'CASCADE'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
  
      await queryInterface.createTable('Settings', {
        key: {
          type: Sequelize.STRING,
          primaryKey: true
        },
        value: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        GroupChatId: {
          type: Sequelize.BIGINT,
          references: {
            model: 'Groups',
            key: 'chatId'
          },
          onDelete: 'CASCADE'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('Settings');
      await queryInterface.dropTable('Addresses');
      await queryInterface.dropTable('Groups');
    }
  };