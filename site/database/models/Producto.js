module.exports = (sequelize, dataTypes) => {
    const cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      code_article: {
        type: dataTypes.INTEGER,
      },
      title: {
          type: dataTypes.STRING,
      },
      gender: {
        type: dataTypes.STRING,
      },   
      description_product: {
        type: dataTypes.STRING,
      },   
      type_cloth: {
        type: dataTypes.STRING,
      }, 
      image: {
        type: dataTypes.STRING,
      }, 
      size: {
        type: dataTypes.STRING,
      },
      colour: {
        type: dataTypes.STRING,
      },
      units: {
        type: dataTypes.INTEGER,
      },
      price: {
        type: dataTypes.DECIMAL,
      },
      price_discount: {          
        type: dataTypes.DECIMAL,
      },
      date_up: {
        type: dataTypes.DATE,
      }
    };

    const config = {
        tableName: 'products',
        timestamps: false
      }
    
      return sequelize.define('Product', cols, config);
}
