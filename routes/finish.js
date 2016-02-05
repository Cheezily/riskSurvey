var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

/* Garbage redirect test placeholder */
router.get('/', function(req, res, next) {
    res.render('finish', { title: req });
});

router.post('/', function(req, res, next) {
    console.log(req);
})

module.exports = router;