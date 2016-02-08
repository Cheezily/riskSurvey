var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoose = require('mongoose');
var userInfo = require('../models/userInfo');


router.get('/', function(req, res, next) {
  res.render('game', { title: 'stuff' });
});

//Grabs the POST data that's submitted once the game is completed.
//db connectivity will go here.  This is the next step to write.
router.post('/', function(req, res) {
  if (req.body) {
    var successResult = {
      success: "Server response: success",
      query: scrambleQuery(req.body.round2_score)
    };

    var userSubmitted = new userInfo({
      time_id: req.body.id,
      startingScore: req.body.startingScore,
      gender: req.body.gender,
      party: req.body.party,
      race: req.body.race,
      income: req.body.income,
      state: req.body.state,
      risk: req.body.risk,
      economy_outlook: req.body.economy_outlook,
      finance_outlook: req.body.finance_outlook,
      job_prospects: req.body.job_prospects,
      finance_security: req.body.finance_security,
      know_job_loss: req.body.know_job_loss,
      job_loss_connection: req.body.job_loss_connection,
      welfare: req.body.welfare,
      government: req.body.government,
      round1_flip: req.body.round1_flip,
      round1_score: req.body.round1_score,
      round2_flip: req.body.round2_flip,
      round2_score: req.body.round2_score
    });

    userSubmitted.save(function(err) {
      if (err) throw err;

      res.send(successResult);
      console.log(JSON.stringify(req.body));
      //console.log("Saved the user info!");
    });
  }
});


function scrambleQuery(score) {
  return ((Number(score) + 4) * 3).toString();
}
module.exports = router;