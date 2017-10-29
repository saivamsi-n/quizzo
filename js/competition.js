 //base Url
var baseUrl = "https://quizzo-api.herokuapp.com/";

  $(document).ready(function() {
            // Add smooth scrolling to all links in navbar + footer link
            $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
                // Make sure this.hash has a value before overriding default behavior
                if (this.hash !== "") {
                    // Prevent default anchor click behavior
                    event.preventDefault();

                    // Store hash
                    var hash = this.hash;

                    // Using jQuery's animate() method to add smooth page scroll
                    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top
                    }, 900, function() {

                        // Add hash (#) to URL when done scrolling (default click behavior)
                        window.location.hash = hash;
                    });
                } // End if
            });

            $(window).scroll(function() {
                $(".slideanim").each(function() {
                    var pos = $(this).offset().top;

                    var winTop = $(window).scrollTop();
                    if (pos < winTop + 600) {
                        $(this).addClass("slide");
                    }
                });
            })

        });

        var test = localStorage.getItem("user");
        user = jQuery.parseJSON(test);
       
        var test = localStorage.setItem("student-username", user.username);
        $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);

        $('a#logout').click(function() {
            window.location.href = "index.html";
            localStorage.clear();
        });

        function nextQuiz() {
            $.ajax({
                url: baseUrl+"quizzo/quiz/next/", // the endpoint
                type: "GET", // http method
                crossDomain: true,
                'contentType': 'application/json',
                // handle a successful response
                success: function(data) {
                    var obj = {};
                    obj.quiz_id = data.quiz_id;
                    localStorage.setItem("quiz", JSON.stringify(obj));

                    console.log(localStorage.getItem('quiz'));
                    $('#countdown').html(data['time']).css('color', 'black');
                },

                // handle a non-successful response
                error: function(xhr, errmsg, err) {
                    
                    $('#countdown').html("NO Quiz avaliable").css('color', 'black');

                }
            });
        }

        function forQuiz(data) {
            console.log("here");
            if (data.check == "true") {
                $('div#test').append('<button id="take-test" class="btn btn-default btn-lg">Take the Test</button>');
                $('button#take-test').click(function() {
                    window.location.href = "quiz.html";
                });
            }
        }

        function checkQuizDate() {
            console.log("create post is working!"); // sanity check

            var test = localStorage.getItem("quiz");
            var quiz = jQuery.parseJSON(test);
            var test = localStorage.getItem("user");
            var user = jQuery.parseJSON(test);
            $.ajax({
                url: baseUrl+"quizzo/student/" + user.username + "/quiz/" + quiz.quiz_id + "/check/", // the endpoint
                type: "GET", // http method
                'contentType': 'application/json',
                // data sent with the post request
                crossDomain: true,
                // handle a successful response
                success: forQuiz,

                // handle a non-successful response
                error: function(xhr, errmsg, err) {
                    $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: " + errmsg +
                        " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                    console.log(xhr.status + ": " + xhr.responseText);
                    // provide a bit more info about the error to the console
                }
            });
        }

        function checkQuizPresent() {

            $.ajax({
                url: baseUrl+"quizzo/quiz/check/", // the endpoint
                type: "GET", // http method
                crossDomain: true,
                'contentType': 'application/json',
                // handle a successful response
                success: function(data) {
                    if (data.check == "true") {
                        nextQuiz();
                        checkQuizDate();
                    } else {
                        $('#countdown').html("NO Quiz avaliable").css('color', 'black');
                    }
                },
                // handle a non-successful response
                error: function(xhr, errmsg, err) {
                    alert("Quiz not present");
                }
            });
        }

        function renderTable(offset, limit) {

            $.ajax({
                url: baseUrl+"quizzo/student/" + user.username + "/quizzes/",
                'contentType': 'application/json',
                method: "POST",
                data: JSON.stringify({
                    "offset": offset,
                    "limit": limit
                }), // data sent with the post request
                crossDomain: true,
                // handle a successful response
                success: function(data) {
                    
                    total = data.total;
                    var table = $('table#table-quizboard tbody');
                    table.html('');
                    quizzes = data.quizzes;
                    for (obj in quizzes) {
                        var forhtml = '<tr>';
                        forhtml += "<td><a href='#' class='check'>" + quizzes[obj].title + "</a></td>";
                        forhtml += "<td>" + quizzes[obj].marks + "</td>";
                        forhtml += "<td>" + quizzes[obj].grade + "</td>";
                        forhtml += '</tr>';
                        table.append(forhtml);

                    }
                   
                },

                // handle a non-successful response
                error: function(xhr, errmsg, err) {
                    alert("Couldnt fetch leaderboard details"); // provide a bit more info about the error to the console

                }
            });

        }
        var position = 1;
        $('#previous-button').click(function() {

            if (position != 1) {
                position--;
                offset -= 5;
                limit -= 5;
                renderTable(offset, limit);
                position++;
                $('#next-button').show();
            }
        });

        $('#next-button').click(function() {
            position++;
            if (limit > total) {
                limit = total;
                offset += 5;
                renderTable(offset, limit, filter_by, search);
                $(this).hide();
            } else {
                limit += 5;
                offset += 5;
                renderTable(offset, limit);
            }
        });

        $("a#name").click(function(event) {
            var test = localStorage.getItem("user");
            user = jQuery.parseJSON(test);
            data = {
                "id": user.id,
                "username": user.username,
                "user_type": user.user_type
            };
            $.ajax({
                url: baseUrl+"quizzo/profile/", // the endpoint
                type: "POST", // http method
                'contentType': 'application/json',
                data: JSON.stringify(data), // data sent with the post request
                crossDomain: true,
                // handle a successful response
                success: function(data) {
                    localStorage.setItem("user-profile-info", JSON.stringify(data));
                    window.location.href = "profile.html";
                },

                // handle a non-successful response
                error: function(xhr, errmsg, err) {
                    alert("Couldnt fetch User profile details");
                }

            });
        });

        $(document).ready(function() {
            checkQuizPresent();
            renderTable(0, 5);

        });
        $(window).on('load', function() {
            $(document).on('click', 'a.check', function() {
                quizTitle = $(this).text();

                var test = localStorage.setItem("reference-quiz-title", quizTitle);
                window.location.href = "answers.html";
            });
        });