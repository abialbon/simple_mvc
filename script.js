// Question model
var Question = function(stem, options, answer) {
    this.stem = stem;
    this.options = options;
    this.answer = answer;
}

Question.prototype.checkAnswer = function(selectedOption) {
    if (this.answer = selectedOption) {
        return true;
    } else {
        return false;
    }
}

var question1 = new Question("Which of the following organs helps us take oxygen from the atmosphere", ["Heart", "Lungs", "Spleen", "Brain"], "Lungs");
var question2 = new Question("Which of the following is not essential for life?", ["Heart", "Lungs", "Brain", "Spleen"], "Spleen");
var question3 = new Question("Which of the following cranial nerves have the largest nucleus?", ["Optic", "Occulomotor", "Trigeminal", "Trochlear"], "Trigeminal");
