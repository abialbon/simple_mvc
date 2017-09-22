document.addEventListener('DOMContentLoaded', function() {

    var start_quiz_btn = document.getElementById('start');
    var banner = document.getElementById('banner');
    var question_pannel = document.getElementById('question');

    var question1 = new Question("Which of the following organs helps us take oxygen from the atmosphere?", ["Heart", "Lungs", "Spleen", "Brain"], "Lungs");
    var question2 = new Question("Which of the following is not essential for life?", ["Heart", "Lungs", "Brain", "Spleen"], "Spleen");
    var question3 = new Question("Which of the following cranial nerves have the largest nucleus?", ["Optic", "Occulomotor", "Trigeminal", "Trochlear"], "Trigeminal");
    
    questionList = [question1, question2, question3];
    quiz = new Quiz(questionList);
    
    start_quiz_btn.addEventListener('click', function() {
        banner.style.opacity= 0;
        setTimeout(function() {
            banner.style.display = 'none';
            question_pannel.style.display = 'block';
            question_pannel.style.opacity = 1;
            populate(quiz.index);
        }, 500);
    });

    function populate(index) {
        var stem = document.getElementById('stem');
        var option1 = document.getElementById('option1');
        var option2 = document.getElementById('option2');
        var option3 = document.getElementById('option3');
        var option4 = document.getElementById('option4');

        stem.innerHTML = questionList[index].stem;
        option1.innerHTML = questionList[index].options[0];
        option2.innerHTML = questionList[index].options[1];
        option3.innerHTML = questionList[index].options[2];
        option4.innerHTML = questionList[index].options[3];

        if (quiz.index === 0) {
            var options = document.getElementsByTagName('li');
            for (var i = 0; i < options.length; i++) {
                options[i].addEventListener('click', function(e) {
                    quiz.proceed(e.target.innerHTML);
                });
            }
        }
    };
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

    Quiz.prototype.proceed = function(answer) {
        console.log('Proceed triggered!');
        if (questionList[this.index].checkAnswer(answer)) {
            console.log('Correct');
            this.score++;
        }
        this.index++;
        if (this.isEnded()) {
            return;
        } else {
            populate(this.index);
        }
    }

    Quiz.prototype.isEnded = function() {
        if (this.index == this.totalQuestions) {
            return true;
        } else {
            return false;
        }
    };
});

