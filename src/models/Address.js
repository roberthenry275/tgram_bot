module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Address', {
      chain: {
        type: DataTypes.ENUM('ETH', 'BSC', 'ARB', 'SOL', 'PLS'),
        allowNull: false,
        validate: {
          isIn: [['ETH', 'BSC', 'ARB', 'SOL', 'PLS']]
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isLowercase: true,
          isValid(value) {
            const validators = {
              ETH: /^0x[a-f0-9]{40}$/,
              BSC: /^0x[a-f0-9]{40}$/,
              ARB: /^0x[a-f0-9]{40}$/,
              SOL: /^[1-9A-HJ-NP-Za-km-z]{32,44}$/,
              PLS: /^0x[a-f0-9]{40}$/
            };
            if (!validators[this.chain]?.test(value)) {
              throw new Error('Invalid address format');
            }
          }
        }
      }
    }, {
      indexes: [{
        fields: ['chain']
      }]
    });
  };