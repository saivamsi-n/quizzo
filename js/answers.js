//User information
var test = localStorage.getItem("user");
var user = jQuery.parseJSON(test);
$('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);
$('h2#title').html(test.title);
$('h4#description').html(test.description);


$('a#logout').click(function() {
    window.location.href = "index.html"
});


function startQuizTest(data) {
    console.log(data.questions_list);
    temp = data.questions_list;

    function QuizQuestion(question, choices, question_id, question_type, user_answer, user_answer_id, correct_answer, correct_answer_id) {
        this.question = question;
        this.choices = choices;
        this.question_id = question_id;
        this.question_type = question_type;
        this.user_answer = user_answer;
        this.user_answer_id = user_answer_id
        this.correct_answer = correct_answer
        this.correct_answer_id = correct_answer_id
    }


    var allQuestions = []
    for (i = 0; i < temp.length; i++) {
        val = new QuizQuestion(temp[i].question, temp[i].options, temp[i].question_id, temp[i].question_type, temp[i].user_answer, temp[i].user_answer_id, temp[i].correct_answer, temp[i].correct_answer_id);
        allQuestions.push(val);
    }


    var currentquestion = 0;
    var correctAnswers = 0;

    function setupOptions() {
        $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
        var options = allQuestions[currentquestion].choices;
        var formHtml = '';
        var answer_status = '';
        $status = $('p#answer-status');

        if (allQuestions[currentquestion].correct_answer == allQuestions[currentquestion].user_answer) {

            $status.html('Answered Correctly :)');
        } else {
            $status.html(' Answered Wrongly :(');
        }
        if (allQuestions[currentquestion].question_type == "mcq") {

            for (var i = 0; i < options.length; i++) {

                formHtml += '<div><label for="option' + i + '">';

                if (allQuestions[currentquestion].user_answer_id == options[i].option_id) {
                    formHtml += "<span style='color:black'>";
                }



                formHtml += '' + options[i].option + '</span></label></div><br/>';
            }
        } else {
            console.log(allQuestions[currentquestion].correct_answer);
            formHtml += '<div class="form-group" style="color:black"><textarea>(Correct Answer)' + allQuestions[currentquestion].correct_answer + '</textarea></div>';
            formHtml += '<div class="form-group" style="color:black"><textarea>(User Answer)' + allQuestions[currentquestion].correct_answer + '</textarea></div>';

        }

        $('#form').html(formHtml);


    }




    $('#next').click(function(event) {

        if ((currentquestion + 1) == allQuestions.length) {
            return;
        }


        event.preventDefault();
        currentquestion++;

        if (currentquestion < allQuestions.length) {
            setupOptions();
        }

    });

    $('#previous').click(function() {
        event.preventDefault();
        if (currentquestion != 0) {
            currentquestion--;
            $('#previous').show();
            setupOptions();
        }
    });
    setupOptions();

}


$(document).ready(function() {
    getQuizReference();

});



function getQuizReference() {

    console.log("in getQuiz!"); // sanity check

    var quizTitle = localStorage.getItem("reference-quiz-title");
    // var quiz = jQuery.parseJSON(test);
    var student_username = localStorage.getItem("student-username");
    $.ajax({
        url: "http://127.0.0.1:8000/quizzo/student/" + student_username + "/quiz/reference/", // the endpoint
        type: "POST", // http method
        'contentType': 'application/json',
        data: JSON.stringify({
            "title": quizTitle
        }), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success: startQuizTest,

        // handle a non-successful response
        error: function(xhr, errmsg, err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }

    });
}