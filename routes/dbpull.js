var express = require('express');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var router = express.Router();
var userInfo = require('../models/userInfo');
var json2csv = require('json2csv');
var warning = '';
var password = "Jinxy";
var fields = ['id', 'time_id', 'startingScore', 'gender', 'party', 'race', 'income',
  'state', 'risk', 'economy_outlook', 'finance_outlook', 'job_prospects',
  'finance_security', 'know_job_loss', 'job_loss_connection', 'welfare', 'government',
  'round1_flip', 'round1_score', 'round2_flip', 'round2_score'];


/* GET dbpull page. */
router.get('/', function(req, res, next) {
  res.render('dbpull', {warning: warning});
  warning = '';
});


router.post('/', function(req, res, next) {

  if (req.body.pw == password) {

    //grab the contents of the userinfo db collection and pass
    //it to json2csv to be saved into a temporary file, dbDump.csv
    userInfo.find({}, function (err, dbDump) {
      if (err) throw err;

      json2csv({data: dbDump, fields: fields}, function (err, csv) {
        if (err) console.log(err);

        //dump the csv into the temp file
        fs.writeFile('./CSVoutput/dbDump.csv', csv, function (err) {
          if (err) throw err;

          //downloads the output csv file in the browser and
          //then clears out the contents of the temp file

          res.download('./CSVoutput/dbDump.csv', 'output.csv', function () {
            fs.writeFile('./CSVoutput/dbDump.csv', "", function(err) {
              if (err) throw err;
            });
          });
        });
      });
    });
  } else {

    warning = 'Incorrect password.....';
    res.redirect('/dbpull');
  }
});

module.exports = router;
