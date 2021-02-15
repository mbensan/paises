const Sequelize = require('sequelize');

// acá creamos la conexión a la Base de Datos
const sql = new Sequelize('paises', 'root', '1005', {
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
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Debe indicar un nombre'
      },
      len: {
        args: [3],
        msg: 'El nonbre debe ser de largo al menos 3'
      }
    }
  },
  continent: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Debe indicar un continente'
      }
    }
  }
});

const City = sql.define('City', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Debe indicar un nombre'
      },
      len: {
        args: [3],
        msg: 'El nonbre debe ser de largo al menos 3'
      }
    }
  }
});

Country.hasMany(City);  // Country "tiene muchas" City
City.belongsTo(Country); // Cada "City" pertenece a un "Country"

//  después sincronizamos nuestro código con la base de datos
sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
});  




// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
  Country,
  City
};

