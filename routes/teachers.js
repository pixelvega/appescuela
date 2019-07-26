let express = require('express');
let router = express.Router();

let Teacher = require('../models/teacher')

router.get('/', (req, res) => {
  Teacher.find((err, teachers) => {
    // res.json(teachers);
    res.render('teachers/list', { profesores: teachers })
  });
})

module.exports = router;