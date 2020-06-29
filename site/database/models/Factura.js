const { sequelize } = require(".");
module.exports = (sequelize, dataTypes) => {
  let alias = 'Factura';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: dataTypes.INTEGER,
    },
    order_shop_id: {
        type: dataTypes.INTEGER,
    },
    order_shop_user_id:{
        type:dataTypes.INTEGER,
    }
  };
  
  let config = {
    tableName : "facturas",
    timestamps: false
  }
  
  const Factura = sequelize.define(alias, cols, config);
  
  Factura.associate = function(models) {
    Factura.belongsTo(models.Order, {
        as: 'order',
        foreignKey: 'order_id'
    })
}
  return Factura;
}
