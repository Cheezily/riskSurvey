var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userInfoSchema = new Schema({
    time_id: String,
    startingScore: String,
    gender: String,
    party: String,
    race: String,
    income: String,
    state: String,
    risk: String,
    economy_outlook: String,
    finance_outlook: String,
    job_prospects: String,
    finance_security: String,
    know_job_loss: String,
    job_loss_connection: String,
    welfare: String,
    government: String,
    round1_flip: String,
    round1_score: String,
    round2_flip: String,
    round2_score: String
});

mongoose.model('userInfo', userInfoSchema);

/*  EXAMPLE DATA
 {
     "id":"1454885235566",
     "startingScore":"5",
     "gender":"female",
     "party":"republican",
     "race":"hispanic",
     "income":"30-40",
     "state":"Minnesota",
     "risk":"comfortable",
     "economy_outlook":"get_worse",
     "finance_outlook":"stay_same",
     "job_prospects":"sometimes",
     "finance_security":"somewhat_insecure",
     "know_job_loss":"yes",
     "job_loss_connection":"sibling,parent,spouse",
     "welfare":"same",
     "government":"6",
     "round1_flip":"loss",
     "round1_score":"3",
     "round2_flip":"insurance",
     "round2_score":"2"
 }
 */