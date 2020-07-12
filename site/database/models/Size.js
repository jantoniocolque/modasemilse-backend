module.exports = (sequelize, dataTypes) => {
    let alias = 'Size';
    
    let cols = {
        id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        size: {
            type: dataTypes.STRING,
        }
    };
    
    let config = {
      tableName : "sizes",
      timestamps: false
    }
    
    const Size = sequelize.define(alias, cols, config);
    
    Size.associate = function(models) {
        Size.belongsToMany(models.Product, {
            as:'size_products',
            through: models.Product_Size,
            foreignKey: 'size_id',
            otherKey:'product_id',
            timestamps:false
        })

        Size.hasMany(models.Product_Size,{
            as: 'size_products_sizes',
            foreignKey: 'size_id'
        })
    }
    return Size;
  }
  