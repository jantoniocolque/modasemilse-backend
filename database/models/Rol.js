module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name_rol: {
        type: dataTypes.STRING,
      }
    };
    
    let config = {
      tableName : "roles",
      timestamps: false
    }
    
    const Rol = sequelize.define(alias, cols, config);
    
    Rol.associate = function(models) {
        Rol.hasMany(models.User, {
          as: 'roles',
          foreignKey: 'rol_id'
        })

        Rol.belongsToMany(models.Operation,{
            as:'operations',
            through:models.Rol_Operation,
            foreignKey:'roles_id',
            otherKey:'operations_id',
            timestamps:false
        })

        Rol.hasMany(models.Rol_Operation,{
            as:'roles_operations',
            foreignKey:'roles_id'
        })
    }

    return Rol;
  }
  