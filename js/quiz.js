  //User information
  var test = localStorage.getItem("user");
  var user = jQuery.parseJSON(test);
  $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);
  $('h2#title').html(test.title);
  $('h4#description').html(test.description);


  $('a#logout').click(function() {
      window.location.href = "index.html"
  });

  var temp = localStorage.getItem("quiztest");
  var test = jQuery.parseJSON(temp);
  temp = test.quiz_questions;

  function startQuizTest(data) {
      console.log(data.quiz_questions);
      temp = data.quiz_questions;

      function QuizQuestion(question, choices, question_id, question_type, user_answer) {
          this.question = question;
          this.choices = choices;
          this.question_id = question_id;
          this.question_type = question_type;
          this.user_answer = user_answer;
      }


      var allQuestions = []
      for (i = 0; i < temp.length; i++) {
          val = new QuizQuestion(temp[i].question, temp[i].options, temp[i].question_id, temp[i].question_type, -1);
          allQuestions.push(val);
      }


      var currentquestion = 0;
      var correctAnswers = 0;
      var final_answers = [];

      function setupOptions() {
          $('#question').html(parseInt(currentquestion) + 1 + ". " + allQuestions[currentquestion].question);
          var options = allQuestions[currentquestion].choices;
          var formHtml = '';

          if (allQuestions[currentquestion].question_type == "mcq") {

              for (var i = 0; i < options.length; i++) {

                  formHtml += '<div><input type="radio" name="option" id="option' + i + '" class="options"';
                  if (allQuestions[currentquestion].user_answer == i) {
                      formHtml += 'checked=checked';
                  }
                  formHtml += '><label for="option' + i + '">' + options[i].option + '</label></div><br/>';
              }

              //$(".options:eq(0)").prop('checked', true);
          } else {

              formHtml += '<div class="form-group"><textarea class="form-control" rows="5" id="comment"></textarea></div><div class="form-group"></div>';
          }

          $('#form').html(formHtml);
          if (allQuestions[currentquestion].user_answer != -1) {
              $('textarea').val(allQuestions[currentquestion].user_answer);
          }
      }


      function saveAnswer(currentquestion) {
          var temp = {};

          if (allQuestions[currentquestion].question_type == "mcq") {

              $("input[type='radio']:checked").each(function() {
                  var idVal = $(this).attr("id");
                  temp.option = $("label[for='" + idVal + "']").text();
                  o = idVal.split('option');
                  allQuestions[currentquestion].user_answer = o[1];
                  c = allQuestions[currentquestion].choices;
                  temp.question_id = allQuestions[currentquestion].question_id;
                  temp.option_id = c[o[1]].option_id;
                  temp.type = "mcq";
              });
          } else {
              text_textarea = $('textarea').val();
              temp.question_id = allQuestions[currentquestion].question_id;
              allQuestions[currentquestion].user_answer = text_textarea;
              temp.option = allQuestions[currentquestion].user_answer;
              temp.option_id = 0;
              temp.type = "essay";
          }
          flag = false;
          for (obj in final_answers) {
              if (temp.question_id == final_answers[obj].question_id) {
                  obj.option_id = temp.option_id
                  obj.option = temp.option
                  flag = true;
              }
          }
          if (flag == false) {
              final_answers.push(temp);
          }
          console.log(final_answers);
      }


      $("div#submit").on('click', '#submit-button', function() {

          saveAnswer(currentquestion);
          if (final_answers.length == 1) {
              for (obj in final_answers) {
                  if (final_answers[obj].hasOwnProperty('option') == false) {
                      alert("You havent answered any questions" + final_answers.length);
                  } else {
                      $("#submit-button").hide();
                      submitAnswers(final_answers);
                  }
              }
          } else {
              final_answers = final_answers.filter(function(obj) {
                  return obj.hasOwnProperty('options') !== false;
              });
              $("#submit-button").hide();
              submitAnswers(final_answers);
          }
      });

      $('#next').click(function() {

          if ((currentquestion + 1) == allQuestions.length) {
              return;
          }


          event.preventDefault();
          saveAnswer(currentquestion);
          currentquestion++;

          if (currentquestion < allQuestions.length) {
              setupOptions();
          }

      });

      $('#previous').click(function() {
          event.preventDefault();
          if (currentquestion != 0) {
              saveAnswer(currentquestion);
              currentquestion--;
              $('#previous').show();
              setupOptions();

          }
      });
      setupOptions();

  }
  $(document).ready(function() {

      $('.jumbotron').hide();
      $('#start').click(function() {

          //setupOptions();
          checkUserAttempt();
      });

  });




  function submitAnswers(final_answers) {
      $('.jumbotron').hide();
      var test = localStorage.getItem("quiz");
      var quiz = jQuery.parseJSON(test);
      console.log(quiz.quiz_id);
      var test = localStorage.getItem("user");
      var user = jQuery.parseJSON(test);
      console.log(final_answers);
      $.ajax({

          url: "http://127.0.0.1:8000/quizzo/student/" + user.username + "/quiz/" + quiz.quiz_id + "/answers/", // the endpoint
          type: "POST", // http method
          'contentType': 'application/json',
          data: JSON.stringify({
              "total": final_answers.length,
              "quiz_questions": final_answers
          }), // data sent with the post request
          crossDomain: true,
          // handle a successful response
          success: function(data) {
              console.log("success");
              $('#result').html('<div class="container"><h3>Grade   </h3><p id="grade">A++</p><br><h3>Marks   </h3><p id="marks">100 </p></div>');
              $('#result').fadeIn(1500)
              $('p#grade').html(data.grade);
              $('p#marks').html(data.marks);
              window.setInterval(function() {
                  /// call your function here
                  if (performance.navigation.type == 1) {
                      console.log("sada");
                      window.location.href = "competition.html";
                  } else {
                      //console.log( "This page is not reloaded");
                  }
              }, 50);

          },

          // handle a non-successful response
          error: function(xhr, errmsg, err) {
              $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                  " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
              alert(xhr.responseText);
              return false;
          }

      });

  }




  function checkUserAttempt() {
      console.log("create post is working!"); // sanity check



      var date = new Date();
      var dateIso = date.toISOString();
      var test = localStorage.getItem("quiz");
      var quiz = jQuery.parseJSON(test);
      var test = localStorage.getItem("user");
      var user = jQuery.parseJSON(test);
      $.ajax({
          url: "http://127.0.0.1:8000/quizzo/student/" + user.username + "/quiz/" + quiz.quiz_id + "/", // the endpoint
          type: "GET", // http method
          //data : { "date_time" : dateIso}, // data sent with the post request
          crossDomain: true,
          // handle a successful response
          success: function(data) {

              if (data == "false") {
                  console.log("in loop");
                  getQuiz();
              } else {
                  alert("You already took the test");
              }
          },

          // handle a non-successful response
          error: function(xhr, errmsg, err) {
              $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                  " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
      });

  }

  function getQuiz() {

      console.log("in getQuiz!"); // sanity check

      $('.jumbotron').fadeIn();
      $("div#details").hide();
      var r = $('<button  type="submit" id="submit-button" class="btn btn-default btn-success">Submit</button>');
      $("#submit").append(r);

      var test = localStorage.getItem("quiz");
      var quiz = jQuery.parseJSON(test);
      var test = localStorage.getItem("user");
      var user = jQuery.parseJSON(test);
      $.ajax({
          url: "http://127.0.0.1:8000/quizzo/student/" + user.username + "/quiz/" + quiz.quiz_id + "/test/", // the endpoint
          type: "GET", // http method
          //data : { "date_time" : dateIso}, // data sent with the post request
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