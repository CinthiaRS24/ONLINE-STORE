const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');


const sequelize = new Sequelize('bsale_test', 'bsale_test', 'bsale_test', {
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    dialect: 'mysql',
    define: {
      timestamps: false
  }
})


const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, Product } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// Category.hasMany(Product);
// Product.belongsTo(Category);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};









// sequelize.authenticate()
//     .then(() => {
//         console.log('CONEXIÓN A LA BASE DE DATOS OK');
//     })
//     .catch(error => {
//         console.log(`EL ERROR DE CONECIÓN ES: ${error}`);
//     })

// categoryModel.findAll({attributes:['id', 'name']})
//     .then(category => {
//         console.log(category);
//     })
//     .catch(error => {
//         console.log(error);
//     })