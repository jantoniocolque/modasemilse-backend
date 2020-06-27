const { sequelize } = require(".");
module.exports = (sequelize, dataTypes) => {
  let alias = 'Orders';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: dataTypes.STRING,
    }
  };
  
  let config = {
    tableName : "orders",
    timestamps: false
  }
  
  const Order = sequelize.define(alias, cols, config);
  
  Order.associate = function(models) {
    Order.belongsTo(models.Shops, {
        as: 'shops',
        foreignKey: 'shop_id'
    })
}
  return Order;
}
