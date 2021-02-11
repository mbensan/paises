const { Router } = require('express');
const { Country } = require('./db');
const router = Router();



// para mostrar los paises
router.get('/', async (req, res) => {
  
  req.session.nombreUsuario = "FRANCISCO BOISIER!!!"; 

  console.log("***********  DESDE EL /" + req.session.nombreUsuario);
  
  const countries = await Country.findAll();



  let mensaje = req.flash('mensaje') ;
    console.log(mensaje);

  res.render('index.ejs', {countries: countries, mensaje: mensaje})
});

// para agregar paises
router.post('/', async (req, res) => {
  // usamos modelos para agregar paises
  const new_country = await Country.create({
    name: req.body.name,
    continent: req.body.continent
  });

  console.log("***********  DESDE EL / POST" + req.session.nombreUsuario);

  req.flash('mensaje', `El pais ${new_country.name} fue creado en base datos.`);

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