module.exports = (sequelize, dataTypes) => {
    let alias = 'Operation';
    
    let cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name_operation: {
        type: dataTypes.STRING,
      }
    };
    
    let config = {
      tableName : "operations",
      timestamps: false
    }
    
    const Operation = sequelize.define(alias, cols, config);
    
    Operation.associate = function(models) {
        Operation.belongsToMany(models.Rol, {
          as: 'operation_roles',
          through:models.Rol_Operation,
          foreignKey:'operations_id',
          otherKey:'roles_id',
          timestamps:false
        })
    
        Operation.hasMany(models.Rol_Operation, {
            as: 'operation_roles_operations',
            foreignKey: 'operations_id'
        })
    }
    return Operation;
  }
  