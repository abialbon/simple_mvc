document.addEventListener('DOMContentLoaded', function() {
    // Questions
    var question1 = new Question("Which of the following organs helps us take oxygen from the atmosphere?", ["Heart", "Lungs", "Spleen", "Brain"], "Lungs");
    var question2 = new Question("Which of the following is not essential for life?", ["Heart", "Lungs", "Brain", "Spleen"], "Spleen");
    var question3 = new Question("Which of the following cranial nerves have the largest nucleus?", ["Optic", "Occulomotor", "Trigeminal", "Trochlear"], "Trigeminal");

    questionList = [question1, question2, question3];
    quiz = new Quiz(questionList);
    // HTML elements
    var start_quiz_btn = document.getElementById('start');
    var banner = document.getElementById('banner');
    var question_pannel = document.getElementById('question');
    var flashBanner = document.getElementById('flash');
    var flashMessage = document.getElementById('flash-message');
    var scoreCard = document.getElementById('score-card');
    var scoreMessage = document.getElementById('score-message');
    var exit = document.getElementById('exit');

    var stem = document.getElementById('stem');
    var option1 = document.getElementById('option1');
    var option2 = document.getElementById('option2');
    var option3 = document.getElementById('option3');
    var option4 = document.getElementById('option4');

    var options = document.getElementsByTagName('li');
    for (var i = 0; i < options.length; i++) {
        options[i].addEventListener('click', function(e) {
            quiz.proceed(e.target.innerHTML);
        });
    }
    // Start
    start_quiz_btn.addEventListener('click', function() {
        banner.style.opacity= 0;
        question_pannel.style.opacity = 1;
        setTimeout(function() {
            banner.style.display = 'none';
            question_pannel.style.display = 'flex';
            populate(quiz.index);
        }, 500);
    });

    function populate(index) {
        stem.innerHTML = questionList[index].stem;
        option1.innerHTML = questionList[index].options[0];
        option2.innerHTML = questionList[index].options[1];
        option3.innerHTML = questionList[index].options[2];
        option4.innerHTML = questionList[index].options[3];
    };

    exit.addEventListener('click', function() {
        quiz.reset();
        scoreCard.style.display = 'none';
        banner.style.display = 'flex';
        banner.style.opacity = 1;

    });
    // Question model
    function Question (stem, options, answer) {
        this.stem = stem;
        this.options = options;
        this.answer = answer;
    }
    
    Question.prototype.checkAnswer = function(selectedOption) {
        if (this.answer == selectedOption) {
            return true;
        } else {
            return false;
        }
    }

    // Quiz model
    function Quiz(questions) {
        this.index = 0;
        this.score = 0;
        this.totalQuestions =  questions.length;
    }
    Quiz.prototype.isEnded = function() {
        if (this.index == this.totalQuestions) {
            return true;
        } else {
            return false;
        }
    };
    Quiz.prototype.proceed = function(answer) {
        if (questionList[this.index].checkAnswer(answer)) {
            this.flash('Correct');
        } else {
            this.flash('Wrong');
        }
    }
    Quiz.prototype.flash = function(result) {
        if (result === 'Correct') {
            this.score++;
            flashMessage.innerHTML = "Yay!!! Correct!!!"
            flashBanner.style.backgroundColor = '#26C281';
        } else {
            flashMessage.innerHTML = "Nope! Wrong! It's <em>\"" + questionList[this.index].answer + "\"</em>";
            flashBanner.style.backgroundColor = '#F22613';
        }
        flashBanner.style.display = 'block';
        flashBanner.classList.add('anim');
        flashBanner.style.opacity = 1;
        this.index++;
        setTimeout(function() {
            flashBanner.style.display = 'none';
            flashBanner.classList.remove('anim');
            flashBanner.style.opacity = 0;
            if (!quiz.isEnded()) {
                setTimeout(function(){
                    populate(quiz.index);
                }, 500);
            } else {
                question_pannel.style.display = 'none';
                scoreCard.style.display = 'flex';
                scoreCard.style.opacity = 1;
                scoreMessage.innerHTML = "Your final score is: " + quiz.score + " / " + quiz.totalQuestions;
            }
            }, 1500);
        }
    Quiz.prototype.reset = function() {
        this.index = 0;
        this.score = 0;
    }
});

