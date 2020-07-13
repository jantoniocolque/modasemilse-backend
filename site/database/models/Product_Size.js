module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_Size';
    
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
            as: 'size_products',
            foreignKeys: 'product_id'
        });
        Product_Size.belongsTo(models.Size,{
            as: 'sizes',
            foreignKeys: 'size_id'
        });
    }
    
    return Product_Size;
  }
  