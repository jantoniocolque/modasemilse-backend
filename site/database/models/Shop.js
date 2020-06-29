const { sequelize } = require(".");
module.exports = (sequelize, dataTypes) => {
  let alias = 'Shop';
  
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cantidad: {
      type: dataTypes.INTEGER,
    },
    total: {
      type: dataTypes.DECIMAL,
    },
    user_id: {
      type: dataTypes.INTEGER,
    }
  };
  
  let config = {
    tableName : "shops",
    timestamps: false
  }
  
  const Shop = sequelize.define(alias, cols, config);
  
  Shop.associate = function(models) {
    Shop.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id'
    })

    Shop.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'shop_id'
    })

    Shop.belongsToMany(models.Product, {
      as:'products',
      through:'product_shop',
      foreignKey: 'shop_id',
      otherKey:'product_id',
      timestamps:false
    })
  }
  return Shop;
}
