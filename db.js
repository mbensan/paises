const Sequelize = require('sequelize');
const CountryModel = require('./models/country');


// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('paises', 'root', '1005', {
  host: 'localhost',
  dialect: 'mysql'
});

// acá inicializamos los modelos
const Country = CountryModel(sql, Sequelize);

//  después sincronizamos nuestro código con la base de datos
sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
});


// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
  Country,
};