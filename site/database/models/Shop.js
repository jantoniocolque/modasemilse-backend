const { sequelize } = require(".");
module.exports = (sequelize, dataTypes) => {
  let alias = 'Shops';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: {
      type: dataTypes.INTEGER,
    },
    toal: {
      type: dataTypes.STRING,
    }
  };
  
  let config = {
    tableName : "shops",
    timestamps: false
  }
  
  const Shop = sequelize.define(alias, cols, config);
  
  Shop.associate = function(models) {
    Shop.belongsTo(models.Users, {
        as: 'users',
        foreignKey: 'user_id'
    })
    Shop.hasMany(models.Orders, {
        as: 'orders',
        foreignKey: 'id'
    })
    }
  return Shop;
}
