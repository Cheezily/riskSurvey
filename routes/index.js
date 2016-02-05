var express = require('express');
var router = express.Router();

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
    res.send(successResult);
    console.log(JSON.stringify(req.body));
  }
});


function scrambleQuery(score) {
  return ((Number(score) + 4) * 3).toString();
}
module.exports = router;