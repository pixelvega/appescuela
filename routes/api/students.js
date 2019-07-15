var express = require('express');
var router = express.Router();
let Student = require('../../models/student');
let { check, validationResult } = require('express-validator/check');
let middleware = require('./middleware');

router.get('/', middleware.checkToken, (req, res) => {
  console.log(req.user);
  Student.find((err, students) => {
    if (err) return res.json({ error: err });
    res.json(students);
  })
})

// http://localhost:3000/api/students
router.post('/', [
  check('nombre', 'El campo nombre es obligatorio').exists(),
  check('apellidos', 'El campo apellidos es obligatorio').exists(),
  check('edad', 'Debes ser mayor de 18 años').custom((age) => {
    return age >= 18;
  }),
  check('dni', 'Tu DNI no es válido').isIdentityCard("ES")
], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array())
  }

  Student.create(req.body, (err, student) => {
    if (err) return res.json({ error: err });
    res.json(student);
  });
})

router.put('/', (req, res) => {
  Student.findByIdAndUpdate(
    req.body.studentId,
    req.body,
    { new: true },
    (err, student) => {
      if (err) return res.json({ error: err });
      res.json(student);
    }
  )
})

router.delete('/', (req, res) => {

  Student.findByIdAndDelete(req.body.studentId, (err, student) => {
    if (err) return res.json({ error: err });
    res.json(student);
  })
})


module.exports = router;