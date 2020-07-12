module.exports = (sequelize, dataTypes) => {
  const alias = 'Favorite';
  
  const cols = {
  };
  
  const config = {
    tableName : "favorites",
    timestamps: false
  }
  
  const Favorite = sequelize.define(alias, cols, config);
  
  Favorite.associate=function(models){
    Favorite.belongsTo(models.User, {
      as: 'favorite_user',
      foreignKey: 'users_id'
    })

    Favorite.belongsTo(models.Product, {
        as: 'favorite_product',
        foreignKey: 'products_id'
    })
  }
  return Favorite;
}
