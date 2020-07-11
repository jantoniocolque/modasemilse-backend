module.exports = (sequelize, dataTypes) => {
  let alias = 'Order';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: dataTypes.STRING,
    },
    date: {
      type: dataTypes.DATE,
    },
    user_id: {
      type: dataTypes.INTEGER,
    }
  };
  
  let config = {
    tableName : "orders",
    timestamps: false
  }
  
  const Order = sequelize.define(alias, cols, config);
  
  Order.associate = function(models) {
    Order.belongsTo(models.Shop, {
        as: 'shop',
        foreignKey: 'shop_id'
    })

    Order.hasOne(models.Factura, {
      as: 'factura',
      foreignKey: 'order_id'
    })
  }
  return Order;
}
