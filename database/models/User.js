module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      avatar: {
        type: dataTypes.STRING,
      },
      nombre: {
        type: dataTypes.STRING,
      },
      apellido: {
        type: dataTypes.STRING,
      },   
      email: {
        type: dataTypes.STRING,
      },   
      password: {
        type: dataTypes.STRING,
      }, 
      nacimiento: {
        type: dataTypes.DATE,
      },  
      sexo: {
        type: dataTypes.STRING,
      },
      newsletter: {
        type: dataTypes.STRING,
      },
    };
    
    let config = {
        tableName : "users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);
    
    User.associate = function(models) {
      User.belongsToMany(models.Product, {
        as: 'user_products',
        through:models.Favorite,
        foreignKey: 'users_id',
        otherKey:'products_id',
        timestamps:false
      })

      User.hasMany(models.Favorite, {
        as: 'user_favorites',
        foreignKey: 'users_id'
      })

      User.belongsTo(models.Rol,{
        as:'rol',
        foreignKey:'rol_id'
      })

      User.hasMany(models.Order,{
        as:'user_orders',
        foreignKey:'user_id'
      })
    }
    return User;
  }