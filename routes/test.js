let express = require('express');
let router = express.Router();
let Persona = require('../models/persona.js');
let Producto = require('../models/producto.js');

router.get('/select', (req, res) => {
  Persona.find((err, personas) => {
    if (err) return res.json({ error: err });
    console.log(personas);
    res.json(personas);
  })
  // res.send('funciona correctiwonder');
})

router.get('/insert', (req, res) => {
  let p = new Persona(); //creo instancia
  p.nombre = 'Rosa'; //modifico propiedades
  p.apellidos = 'Gutiérrez';
  p.edad = 34;
  p.save((err) => { //guardo
    if (err) return res.json({ error: err })
    res.json({ success: 'Persona insertada' }) //las propiedades pueden llamarse como nosotros queramos
  });
});

//llamamos al metodo create y le pasamos los datos 
router.get('/insertv2', (req, res) => {
  Persona.create({
    nombre: 'Raul',
    apellidos: 'García',
    edad: 87
  }, (err, persona) => {
    if (err) return res.json({ error: err });
    res.json(persona)
  }) //aquí persona se puede cambiar por la palabra que quieras (que tenga sentido)
})

//los datos se recogen de req.body y se le pasan para crear una persona
router.post('/insertv3', (req, res) => {
  // res.json(req.body) //es el objeto que estoy recibiendo
  Persona.create(req.body, (err, persona) => {
    if (err) return res.json({ error: err });
    res.json(persona)
  })
})


//los datos se recogen de req.body y se le pasan para crear una persona
router.post('/insertv4', (req, res) => {
  // res.json(req.body) //es el objeto que estoy recibiendo
  Producto.create(req.body, (err, producto) => {
    if (err) return res.json({ error: err });
    res.json(producto)
  })
})



router.get('/virtuales', (req, res) => {
  //recupero todos los documentos de la colección personas
  Persona.find((err, personas) => {
    // Compruebo si hay error
    if (err) return res.send(err);
    //Renderizo la vista pasando el array con las personas recuperadas
    res.render('listaPersonas', { arrPersonas: personas }); //recuperamos el objeto personas del find
  })
})

router.get('/filtros', (req, res) => {
  Persona.find({
    //filtro las personas que tengan exactamente 34 años-> edad: 34
    // edad: { $gt: 25 }
    edad: { $gt: 20, $lt: 50 },
    nombre: 'Mario'

  }, (err, personas) => {
    //Renderizo la vista pasando el array con las personas recuperadas
    res.render('listaPersonas', { arrPersonas: personas }); //recuperamos el objeto personas del find
  })
})

//actualizar un registro
router.get('/update', (req, res) => {
  Persona.findById('5d171afe43aff5770f737472', (err, persona) => {
    // res.json(persona);
    persona.edad = 67;
    //hay que volver a llamar al save()
    persona.save((err) => {
      if (err) return res.json({ error: err });
      res.send('Persons actualizada');
    })
  });
})

router.get('/productosactivos', (req, res) => {
  Producto.activos((err, productos) => {
    if (err) return res.json({ error: err });
    res.json(productos);
  });
})

router.get('/asociaciones', (req, res) => {
  Producto.findById('5d174d89e6e6428d5e72e4fd', (err, producto) => {
    let p = new Persona();
    p.nombre = 'Ana';
    p.apellidos = 'Gonzalez';
    p.edad = 39;
    p.producto = producto;
    p.save((err) => {
      if (err) return res.json(err);
      res.json(p);
    })
  });
})

router.get('/asociacionesv2', (req, res) => {
  Producto.findById('5d174d89e6e6428d5e72e4fd', (err, producto) => {
    let p = new Persona();
    p.nombre = 'Ana';
    p.apellidos = 'Gonzalez';
    p.edad = 39;
    p.productos.push(producto);
    p.save((err) => {
      if (err) return res.json(err);
      res.json(p);
    })
  });
})


router.get('/mismodepartamento', (req, res) => {
  let prod = new Producto();
  prod.departamento = 'electrodomésticos';
  prod.mismoDepartamento((err, productos) => {
    if (err) return res.json({ error: err });
    res.json(productos);
  });
})

module.exports = router;