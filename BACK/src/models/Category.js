const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },  
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'category'
  },
  {
    timestamps: false
  });
};
