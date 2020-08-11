module.exports = (sequelize, dataTypes) => {
  let alias = 'Order';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total:{
      type: dataTypes.DECIMAL,
    },
    estado: {
      type: dataTypes.STRING,
    },
    date: {
      type: dataTypes.DATE,
    }
  };
  
  let config = {
    tableName : "orders",
    timestamps: false
  }
  
  const Order = sequelize.define(alias, cols, config);
  
  Order.associate = function(models) {
    Order.belongsToMany(models.Product, {
        as: 'order_products',
        through:models.Order_Product,
        foreignKey: 'orders_id',
        otherKey:'products_id',
        timestamps:false
    })

    Order.hasMany(models.Order_Product, {
      as: 'order_orders_products',
      foreignKey: 'orders_id'
    })

    Order.belongsTo(models.User,{
      as:'order_user',
      foreignKey:'user_id'
    })

    Order.hasOne(models.Factura,{
      as:'factura',
      foreignKey:'order_id'
    })
  }
  return Order;
}
