const { Router } = require('express');
const { Country } = require('./db');


const router = Router();


// para mostrar los paises
router.get('/', async (req, res) => {
  const countries = await Country.findAll();
  res.render('index.ejs', {countries: countries})
});

// para agregar paises
router.post('/', async (req, res) => {
  // usamos modelos para agregar paises
  const new_country = await Country.create({
    name: req.body.name,
    continent: req.body.continent
  });

  const countries = await Country.findAll();

  res.render('index.ejs', {countries: countries});
});

module.exports = router;