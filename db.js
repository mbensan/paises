const Sequelize = require('sequelize');


// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('paises', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// acá inicializamos los modelos (tablas)
const Country = sql.define('Country', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//  después sincronizamos nuestro código con la base de datos
sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
});


// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
  Country,
};