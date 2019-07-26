var express = require('express');
var router = express.Router();

let apiStudentsRouter = require('./api/students');
let apiUsersRouter = require('./api/users');


router.use('/students', apiStudentsRouter);
router.use('/users', apiUsersRouter);


module.exports = router;