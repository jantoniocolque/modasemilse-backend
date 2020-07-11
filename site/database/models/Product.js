module.exports = (sequelize, dataTypes) => {
  const alias = 'Product';
  
  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    code_article: {
      type: dataTypes.STRING,
    },
    title: {
      type: dataTypes.STRING,
    },
    description_product: {
      type: dataTypes.STRING,
    }, 
    image: {
      type: dataTypes.STRING,
    },
    image2: {
      type: dataTypes.STRING,
    },
    image3: {
      type: dataTypes.STRING,
    },
    gender: {
      type: dataTypes.STRING,
    },
    date_up: {
      type: dataTypes.DATE,
    },
    category_id: {
      type: dataTypes.INTEGER,
    },
    price: {
      type: dataTypes.DECIMAL,
    },
    price_discount: {          
      type: dataTypes.DECIMAL,
    },
    colour: {
      type: dataTypes.STRING,
    }
  };
  
  const config = {
    tableName : "products",
    timestamps: false
  }
  
  const Product = sequelize.define(alias, cols, config);
  
  Product.associate=function(models){
    Product.belongsToMany(models.Shop, {
      as:'shops',
      through:'product_shop',
      foreignKey: 'product_id',
      otherKey:'shop_id',
      timestamps:false
    })

    Product.belongsToMany(models.Favorite, {
      as:'favorites',
      through:'product_favorite',
      foreignKey: 'product_id',
      otherKey:'favorite_id',
      timestamps:false
  })
  }
  return Product;
}
