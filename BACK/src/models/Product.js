const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },  
    name: {
      type: DataTypes.STRING,
    },
    url_image: {
      type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    discount: {
        type: DataTypes.INTEGER,
    },
    category: {
        type: DataTypes.INTEGER,
    }   
  },
  {
    tableName: 'product'
  },
  {
    timestamps: false
  });
};
