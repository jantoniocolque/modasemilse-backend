module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_Size';
    
    let cols = {
      units: {
        type: dataTypes.INTEGER,
      }
    };
    
    let config = {
      tableName : "product_size",
      timestamps: false
    }
    
    const Product_Size = sequelize.define(alias, cols, config);

    Product_Size.associate = function(models) {
        Product_Size.belongsTo(models.Product,{
            as: 'product_size_product',
            foreignKeys: 'product_id'
        })
        Product_Size.belongsTo(models.Size,{
            as: 'product_size_size',
            foreignKeys: 'size_id'
        })
    }
    
    return Product_Size;
  }
  