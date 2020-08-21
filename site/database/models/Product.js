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
    price: {
      type: dataTypes.DECIMAL,
    },
    price_discount: {          
      type: dataTypes.DECIMAL,
    },
    colour: {
      type: dataTypes.STRING,
    },
    discount: {
      type:dataTypes.DECIMAL,
    }
  };
  
  const config = {
    tableName : "products",
    timestamps: false
  }
  
  const Product = sequelize.define(alias, cols, config);
  
  Product.associate = function(models){
    Product.belongsTo(models.Category, {
      as:'category',
      foreignKey: 'category_id'
    });

    Product.belongsToMany(models.Size, {
      as:'sizes',
      through:'product_size',
      foreignKey:'product_id',
      otherKey:'size_id',
      timestamps:false
    });

    Product.hasMany(models.Product_Size,{
      as: 'products_sizes',
      foreignKey: 'product_id'
    });

    Product.belongsToMany(models.Order, {
      as: 'orders',
      through:models.Order_Product,
      foreignKey: 'products_id',
      otherKey:'orders_id',
      timestamps:false
    });
    

    Product.hasMany(models.Order_Product, {
      as: 'orders_products',
      foreignKey: 'products_id'
    })

    Product.belongsToMany(models.User, {
      as: 'users',
      through:'favorites',
      foreignKey: 'products_id',
      otherKey:'users_id',
      timestamps:false
    });

    Product.hasMany(models.Favorite, {
      as: 'favorites',
      foreignKey: 'products_id'
    });
  }
  return Product;
}
