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
        },
        product_id: {
            type: dataTypes.INTEGER,
        },
        size_id: {
            type: dataTypes.INTEGER,
        },
        code:{
            type: dataTypes.STRING,
        }
    };
    
    let config = {
      tableName : "product_size",
      timestamps: false
    }
    
    const Product_Size = sequelize.define(alias, cols, config);

    Product_Size.associate = function(models) {
        Product_Size.belongsTo(models.Product,{
            foreignKey: 'product_id'
        });
        Product_Size.belongsTo(models.Size,{
            foreignKey: 'size_id'
        });
    }
    
    return Product_Size;
  }
  