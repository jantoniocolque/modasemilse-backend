module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol_Operation';
    
    let cols = {
    };
    
    let config = {
      tableName : "rol_operation",
      timestamps: false
    }
    
    const Rol_Operation = sequelize.define(alias, cols, config);
    
    Rol_Operation.associate = function(models) {
        Rol_Operation.belongsTo(models.Operation, {
          as: 'rol_operation_operation',
          foreignKey: 'operations_id'
        })
    
        Rol_Operation.belongsTo(models.Rol, {
            as: 'rol_operation_rol',
            foreignKey: 'roles_id'
        })
    }
    return Rol_Operation;
  }
  