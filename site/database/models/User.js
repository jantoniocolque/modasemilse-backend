module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    
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
      }
    };
    
    let config = {
      timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);
    
    return User;
  }