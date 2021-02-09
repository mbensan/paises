const express = require("express");
const app = express();
const port = 8000;

// para los posts
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

// Para las vistas
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// para archivos estaticos
app.use('/static', express.static("static"));

// importar las rutas
app.use(require('./routes'));


app.listen(port, function() {
  console.log('Escuchando en el puerto ' + port);
});