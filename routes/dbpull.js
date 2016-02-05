var express = require('express');
var router = express.Router();

//this section will be for the owner to access to get a dump from the database. This is the next step.

/* GET dbpull listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'balllllls' });
  //res.send('respond with a resource');
});

module.exports = router;
