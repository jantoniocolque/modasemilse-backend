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
      roles_id: {
        type: dataTypes.INTEGER,
      }
    };
    
    let config = {
        tableName : "users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);
    
    User.associate = function(models) {
        User.hasOne(models.Shop, {
            as: 'shop',
            foreignKey: 'user_id'
        })

        User.hasOne(models.Favorite, {
          as:'favorite',
          foreignKey: 'user_id',
        })
    }
    return User;
  }