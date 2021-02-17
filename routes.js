const { Router } = require('express');
const { Country, City, Language } = require('./db');
const router = Router();


async function prueba() {
  // primero recupero el país
  const argentina = await Country.findOne({name: 'Argentina'});
  // después le puedo crear una ciudad con el método "createCity"
  const bsas = await argentina.createCity({name: "Buenos Aires"});
  // puedo borrar una ciudad que pertenezca a argentina
  await argentina.removeCity(bsas);

  // puedo preguntar si existe la ciudad
}




// para mostrar los paises
router.get('/', async (req, res) => {
  
  req.session.nombreUsuario = "FRANCISCO BOISIER!!!"; 

  console.log("***********  DESDE EL /" + req.session.nombreUsuario);
  
  const countries = await Country.findAll();



  let mensaje = req.flash('mensaje') ;
    console.log(mensaje);

  res.render('index.ejs', {countries: countries, mensaje: mensaje})
});

// para mostrar las ciudades
router.get('/cities', async (req, res) => {
  const countries = await Country.findAll();

  const cities = await City.findAll({
    include: [Country]
  });

  res.render('cities.ejs', {countries: countries, cities: cities})
});

// para crear nuevas ciudades
router.post('/cities', async (req, res) => {
  // console.log(`Creando la ciudad ${req.body.name} para el pais ${req.body.countryId}`);

  const name = req.body.name;
  const CountryId = req.body.countryId;
  
  // validación en el backend
  if (name == '' || name.length <= 2) {
    res.statusCode = 400;
    return res.send('ERROR');
  } else if (CountryId == '') {
    return res.send('ERROR')
  }

  const city = await City.create({
    name: req.body.name,
    CountryId: req.body.countryId
  });
  res.redirect('/cities');
});

// para agregar paises
router.post('/', async (req, res) => {
  // usamos modelos para agregar paises

  try {
    const new_country = await Country.create({
      name: req.body.name,
      continent: req.body.continent
    });
    req.flash('mensaje', `El pais ${new_country.name} fue creado en base datos.`);

  } catch (errors) {
    for (var key in errors.errors) {
      req.flash('mensaje', errors.errors[key].message);
    }
  }

  console.log("***********  DESDE EL / POST" + req.session.nombreUsuario);


  res.redirect("/");
});

router.get('/eliminar/:id' , async (req,res) => {

  const pais = await Country.findByPk(req.params.id);
  await pais.destroy();
  
  //req.flash('mensaje', `El pais ${pais.name} fue eliminado.`);

  console.log("***********  DESDE EL /eliminar/:id" + req.session.nombreUsuario);

  res.json({ estado: true,  mensaje: `El pais ${pais.name} fue eliminado.`});
});

router.post('/actualizar/:id' , async (req,res) => {

  console.log("Llego ID:" +  req.params.id);
  console.log("Del formulario EDITAR llego este name: " + req.body.name);
  console.log("Del formulario EDITAR llego este continent: " + req.body.continent);

  const pais = await Country.findByPk(req.params.id);
  pais.name = req.body.name;
  pais.continent = req.body.continent;
  await pais.save();

  req.flash('mensaje', `El pais ${pais.name} fue actualizado.`);

  console.log("***********  DESDE EL /actualizar/:id post: " + req.session.nombreUsuario);

  res.redirect("/");

});

// para mostrar los paises
router.get('/editar/:id', async (req, res) => {
  
  console.log("Llego ID:" +  req.params.id);
  const pais = await Country.findByPk(req.params.id);  
  
  let mensaje = req.flash('mensaje') ;
  console.log(mensaje);

  console.log("***********  DESDE EL /editar/:id'" + req.session.nombreUsuario);

  res.render('editar.ejs', {pais: pais, mensaje: mensaje})
});

module.exports = router;