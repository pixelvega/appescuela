let express = require('express');
let router = express.Router();

let Student = require('../models/student');

router.get('/', (req, res) => {
    Student.find((err, students) => {
        res.render('students/list', { estudiantes: students })
    });
})

// Maneja la petición que nos devuelve el formulario para la creación de estudiantes
router.get('/new', (req, res) => {
    res.render('students/form');
})

router.get('/:studentId', (req, res) => {
    console.log(req.params);
    Student.findById(req.params.studentId, (err, student) => {
        res.render('students/show', { estudiante: student })
    });
})

// Muestra el form de edición para un estudiante concreto por su id
router.get('/edit/:studentId', (req, res) => {
    Student.findById(req.params.studentId, (err, student) => {
        if (err) return res.json({ error: err })
        res.render('students/edit', { estudiante: student })
    })
})

// Recuperar los valores que me está devolviendo el formulario, Eliminar y redireccionar
router.get('/delete/:studentId', (req, res) => {
    Student.findByIdAndRemove(req.params.studentId, req.body, (err, result) => {
        console.log(result);
        res.redirect('/students');
    })
});


// Ruta para recibir los valores del formulario
router.post('/create', (req, res) => {
    req.body.activo = true;
    Student.create(req.body, (err, student) => {
        res.redirect('/students');
    });
});

// Recuperar los valores que me está devolviendo el formulario, actualizarlos y redireccionar
router.post('/update', (req, res) => {
    console.log(req.body);
    req.body.activo = (req.body.activo === 'on') ? true : false;
    Student.findByIdAndUpdate(req.body.studentId, req.body, (err, student) => {
        res.redirect('/students/' + student._id);
    })
});

module.exports = router;
