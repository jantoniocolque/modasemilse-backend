module.exports = (sequelize, dataTypes) => {
  let alias = 'Factura';
  
  let cols = {
    type_factura:{
        type:dataTypes.STRING,
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
