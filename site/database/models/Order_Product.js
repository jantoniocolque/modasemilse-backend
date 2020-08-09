module.exports = (sequelize, dataTypes) => {
    let alias = 'Order_Product';
    
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    };
    
    let config = {
      tableName : "order_product",
      timestamps: false
    }
    
    const Order_Product = sequelize.define(alias, cols, config);
    
    Order_Product.associate = function(models) {
        Order_Product.belongsTo(models.Product,{
            as: 'order_product_product',
            foreignKeys: 'products_id'
        })

        Order_Product.belongsTo(models.Order,{
            as: 'order_product_order',
            foreignKeys: 'orders_id'
        })
    }
    return Order_Product;
  }
  