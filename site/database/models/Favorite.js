module.exports = (sequelize, dataTypes) => {
  const alias = 'Favorite';
  
  const cols = {
    users_id: {
      type: dataTypes.INTEGER,
    },
    products_id: {
      type: dataTypes.INTEGER,
    }
  };
  
  const config = {
    tableName : "favorites",
    timestamps: false
  }
  
  const Favorite = sequelize.define(alias, cols, config);
  
  Favorite.associate=function(models){
    Favorite.belongsTo(models.User, {
      as:'user',
      foreignKey: 'user_id',
    })

    Favorite.belongsToMany(models.Product, {
        as:'products',
        through:'product_favorite',
        foreignKey: 'favorite_id',
        otherKey:'product_id',
        timestamps:false
    })
  }
  return Favorite;
}
