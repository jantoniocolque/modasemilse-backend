module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type_cloth: {
        type: dataTypes.STRING,
      }
    };
    
    let config = {
      tableName : "categorys",
      timestamps: false
    }
    
    const Category = sequelize.define(alias, cols, config);
    
    Category.associate = function(models) {
        Category.hasMany(models.Product, {
          as: 'products',
          foreignKey: 'category_id'
        })
    }
    return Category;
  }
  