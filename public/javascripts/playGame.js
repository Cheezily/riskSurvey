function game() {

    var userInfo = {};
    var startScreen = true;
    var questionNumber = 0; //used as a step counter for the whole script
    var fadeDelay = 300; //time in ms for questions to transition
    var payoff = "points"; //should be "cash" or "points"
    var score = 5; //specify beginning game balance here
    var balanceChange = 2; //gain or loss from coin flip
    var insuranceCost = 1; //gain or loss from buying insurance
    var round = 1;
    var query = ''; //used for the url query at the end of the game

    $('.container').slideDown(600);

    //each step in the script advances the question number variable
    $('.next').click(function () {
        if (questionNumber <= 14) { //advances through the questions
            displayQuestion(questionNumber);
        } else if (questionNumber <= 17) { //starts the game
            startGame(questionNumber);
        } else if (questionNumber === 19) { //game is done. Pass data to the server
            $('.game').fadeOut(fadeDelay);
            $('.next').fadeOut();
            setTimeout(function () {
                $('.finished').fadeIn(fadeDelay);
                submitResults();
            }, fadeDelay + 100);
            questionNumber++;
        } else if (questionNumber > 19) { //forward to the name info server with the score hidden in the url query
            $('.next').off();
            window.location.replace('/finish?q=' + query)
        }

        console.log(JSON.stringify(userInfo) + " QNUMBER: " + questionNumber);
    });

    //questions advanced based on the question number.  Called by the "next" button click.
    //This could be refactored into one function referencing a list based on the question number, but one of
    // the questions potentially has 2 parts.
    function displayQuestion(qNumber) {
        console.log("qN: " + qNumber + " start: " + startScreen);

        if (qNumber == 0) {
            userInfo['id'] = Date.now();
            userInfo['startingScore'] = score.toString();
            $('.welcome').fadeOut(fadeDelay);
            setTimeout(function () {
                $('.genderQuestion').fadeIn(fadeDelay);
                questionNumber++;
            }, 400);
        }
        if (qNumber == 1) {
            if (!$('input[name=genderAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.genderQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.partyQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["gender"] = $('input[name=genderAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 2) {
            if (!$('input[name=partyAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.partyQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.raceQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["party"] = $('input[name=partyAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 3) {
            if (!$('input[name=raceAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.raceQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.incomeQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["race"] = $('input[name=raceAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 4) {
            if (!$('input[name=incomeAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.incomeQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.stateQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["income"] = $('input[name=incomeAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 5) {
            if ($('.stateAnswer').val() === "blank") {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.stateQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.riskQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["state"] = $('.stateAnswer').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 6) {
            if (!$('input[name=riskAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.riskQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.economyQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["risk"] = $('input[name=riskAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 7) {
            if (!$('input[name=economyAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.economyQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.financeQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["economy_outlook"] = $('input[name=economyAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 8) {
            if (!$('input[name=financeAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.financeQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.jobQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["finance_outlook"] = $('input[name=financeAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 9) {
            if (!$('input[name=jobAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.jobQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.financeSecurityQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["job_prospects"] = $('input[name=jobAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 10) {
            if (!$('input[name=financeSecurityAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.financeSecurityQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.lostJobQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["finance_security"] = $('input[name=financeSecurityAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 11) {
            if (!$('input[name=lostJobAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                //$('.lostJobQuestion').fadeOut(300);
                if ($('input[name=lostJobAnswer]:checked').val() === 'yes') {
                    userInfo["know_job_loss"] = 'yes';
                    $('.lostJobConnectionQuestion').fadeIn(fadeDelay - 100);
                    questionNumber++;
                } else {
                    userInfo["know_job_loss"] = 'no';
                    userInfo["job_loss_connection"] = 'none';
                    $('.lostJobQuestion').fadeOut(fadeDelay);
                    $('.lostJobConnectionQuestion').fadeOut(fadeDelay);
                    setTimeout(function () {
                        $('.welfareQuestion').fadeIn(fadeDelay);
                        questionNumber = questionNumber + 2;
                    }, fadeDelay + 100);
                }
                $('.warning').text('');
            }
        }

        if (qNumber == 12) {
            if (!$('input[name=lostJobConnectionAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.lostJobConnectionQuestion').fadeOut(fadeDelay);
                $('.lostJobQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.welfareQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["job_loss_connection"] = $('input[name=lostJobConnectionAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 13) {
            if (!$('input[name=welfareAnswer]:checked').val()) {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.welfareQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.governmentQuestion').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["welfare"] = $('input[name=welfareAnswer]:checked').val();
                $('.warning').text('');
            }
        }

        if (qNumber == 14) {
            if ($('.governmentAnswer').val() === "blank") {
                $('.warning').text('Please answer the current question to continue.');
            } else {
                $('.governmentQuestion').fadeOut(fadeDelay);
                setTimeout(function () {
                    $('.questionsDone').fadeIn(fadeDelay);
                    questionNumber++;
                }, fadeDelay + 100);
                userInfo["government"] = $('.governmentAnswer').val();
                $('.warning').text('');
            }
        }
    };

    //called by the "next" button click after the questions have been answered.
    //Resizes the question box for the game and displays the rules
    function startGame(qNumber) {
        if (qNumber <= 15) {
            refreshScreen();
            $('.welcome').fadeOut(fadeDelay);
            $('.question').fadeOut(fadeDelay);
            $('.container').animate({width: "740px"}, fadeDelay * 1.5);
            $('.next').animate({marginLeft: "590px"}, fadeDelay * 1.5);
            setTimeout(function () {
                $('.rules').fadeIn(fadeDelay);
            }, fadeDelay * 2);
            questionNumber++;
        } else {
            $('.rules').fadeOut(fadeDelay);
            $('.next').fadeOut(fadeDelay);
            setTimeout(function () {
                $('.gameBoard').fadeIn(fadeDelay);
            }, fadeDelay + 100);
        }
    };

    //game can be used to pay points or cash
    function showScore(score) {
        if (payoff === "cash") {
            return "$" + score.toFixed(2).toString();
        }
        if (payoff === "points") {
            if (score === 1) {
                return score.toFixed(0).toString() + " point";
            } else {
                return score.toFixed(0).toString() + " points";
            }
        }
    };

    //send completed information to the server after the game is over. Called by the "next" button click.
    function submitResults() {
        $.ajax({
            type: "POST",
            url: "/",
            data: userInfo,
            success: function (result) {
                $('.warning').text(result.success);
                $('.next').fadeIn(fadeDelay);
                updateURLQuery(result.query);
            },
            dataType: "json"
        });
    }

    //gets the URL query with the score ready for the next step of the "next" button click
    function updateURLQuery(result) {
        query = result;
    };


    $('.flipButton').click(function () {
        coinFlip(Math.floor(Math.random() * 2));
    });


    $('.insuranceButton').click(function () {
        score -= insuranceCost;
        userInfo['round' + round + "_flip"] = "insurance";
        userInfo['round' + round + "_score"] = (score - insuranceCost).toString();
        $('.dialogContents').hide().text("Insurance purchased for round " + round + "........")
            .fadeIn(fadeDelay - 100);

        if (round === 2) {
            endGame();
        } else {
            round++;
        }

        questionNumber++;
        console.log(JSON.stringify(userInfo) + " QNUMBER: " + questionNumber);
        refreshScreen();
    });


    function coinFlip(outcome) {

        $('.dialogContents').hide().text("Flipping........").fadeIn(fadeDelay - 100);
        $('#coinHeads').hide();
        $('#coinTails').hide();
        $('#coinFlip').show();
        $('#coinFlip').animate({ //coins flips up
            width: "150px",
            height: "150px",
            marginLeft: "-=15px",
            marginTop: "-=15px"
        }, 500);

        setTimeout(function () {
            $('#coinFlip').animate({ //coin falls back down
                width: "100px",
                height: "100px",
                marginLeft: "+=15px",
                marginTop: "+=15px"
            }, 500);
        }, 700);

        setTimeout(function () {
            $('.dialogContents').fadeOut(fadeDelay);
        }, 900);

        setTimeout(function () {
            $('#coinFlip').hide();
            if (outcome === 1) {
                score = score - balanceChange;
                userInfo['round' + round + "_flip"] = "loss";
                userInfo['round' + round + "_score"] = score.toString();
                $('.dialogContents').text("Tails it is.  You lost this round.");
                $('#coinTails').show();
            } else {
                $('.dialogContents').text("Heads it is!  You won this round.");
                score = score + balanceChange;
                userInfo['round' + round + "_flip"] = "win";
                userInfo['round' + round + "_score"] = score.toString();
                $('#coinHeads').show();
            }

            //end of the game check
            if (round === 2) {
                endGame();
            } else {
                round++;
            }

            $('.dialogContents').fadeIn(fadeDelay);
            questionNumber++;
            console.log(JSON.stringify(userInfo) + " QNUMBER: " + questionNumber);
            refreshScreen();
        }, 1200);
    };


    function endGame() {
        $('.flip').off();
        $('.insurance').off();
        $('.flipContainer').fadeOut(fadeDelay * 4);
        $('.insuranceContainer').fadeOut(fadeDelay * 4);
        setTimeout(function () {
            $('.dialogContents').fadeOut(fadeDelay * 1.5);
            setTimeout(function () {
                $('.dialogContents').text("Thank you for participating! Please click next to continue.");
                $('.dialogContents').fadeIn(fadeDelay);
                $('.next').fadeIn(fadeDelay);
            }, (fadeDelay * 1.5) + 100);
            questionNumber++;
        }, 1500);
    };

    //used to refresh the basic contents of the game screen
    function refreshScreen() {
        $('.payoff').text(showScore(score));
        $('.payoffChange').text(showScore(balanceChange));
        $('.payoffWin').text(showScore(score + balanceChange));
        $('.payoffLose').text(showScore(score - balanceChange));
        $('.insuranceAmount').text(showScore(insuranceCost));
        $('.roundNumber').text(round.toString());
    };
};

game();