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
    });
});

function modalCloseOpen() {
    $("a#signupinlogin").click(function(event) {
        $('#loginModal').modal('hide');
        event.preventDefault();
    });
    $("#loginModal").on('shown.bs.modal', function() {

        $('body').addClass('check');

    }).on('hidden.bs.modal', function() {

        $('body').removeClass('check');
    });

}

function modalPaddingSettings() {


    var fixedCls = '.navbar-fixed-top,.navbar-fixed-bottom';
    var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function() {
        oldSSB.apply(this);
        if (this.bodyIsOverflowing && this.scrollbarWidth)
            $(fixedCls).css('padding-right', this.scrollbarWidth);
    }

    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function() {
        oldRSB.apply(this);
        $(fixedCls).css('padding-right', '');
    }
}

function nextQuiz() {
    $.ajax({
        url: baseUrl+"quizzo/quiz/next/", // the endpoint
        type: "GET", // http method
        crossDomain: true,
        // handle a successful response
        success: function(json) {
            $('#countdown').html(json['time']).css('color', 'white');
        },

        // handle a non-successful response
        error: function(xhr, errmsg, err) {
          alert("No Quiz Avaialable");
        }
    });
}

function getLeaderBoard() {
   
    $.ajax({
        url: baseUrl+"quizzo/leaderboard/", // the endpoint
        type: "POST", // http method
        'contentType': 'application/json',
        data: JSON.stringify({
            "offset": 0,
            "limit": 10,
            "filter_by": "all",
            "search": ""
        }), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success: function(json) {
            $(function() {
                $('#table-leaderboard').bootstrapTable({
                    data: json['students']
                });
                $('.fixed-table-loading').html("");
            });
        },

        // handle a non-successful response
        error: function(xhr, errmsg, err) {
          alert("Couldnt fetch leaderboard details");          
        }
    });
}


function studentSignupForm() {
    $("form#student-signup-form").submit(function(event) {
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();


        $.ajax({
            url: baseUrl+"quizzo/student/signup/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {
                var user = {};
                user.id = data.id;
                user.username = data.username;
                user.user_type = data.user_type;
                localStorage.setItem("user", JSON.stringify(user));
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
               
                alert(xhr.responseText);
            }
        });

    });

}


function teacherSignupForm() {
    $("form#teacher-signup-form").submit(function(event) {
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();


        $.ajax({
            url: baseUrl+"quizzo/teacher/signup/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {
                var user = {};
                user.id = data.id;
                user.username = data.username;
                user.user_type = data.user_type;
                localStorage.setItem("user", JSON.stringify(user));

                window.location.href = "leaderboard.html";
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
            
                alert(xhr.responseText);
            }
        });

    });

}



function studentLoginForm() {
    $("form#student-login-form").submit(function(event) {
        list = $(this).serializeArray();
        
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        
        event.preventDefault();


        $.ajax({
            url: baseUrl+"quizzo/student/login/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {
                var user = {};
                user.id = data.id;
                user.username = data.username;
                user.user_type = data.user_type;
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "competition.html";
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
              
                alert(xhr.responseText);
            }
        });

    });
}

function teacherLoginForm() {
    $("form#teacher-login-form").submit(function(event) {
        list = $(this).serializeArray();
        console.log(list);
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        console.log(values);
        event.preventDefault();


        $.ajax({
            url: baseUrl+"quizzo/teacher/login/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {

                var user = {};
                user.id = data.id;
                user.username = data.username;
                user.user_type = data.user_type;
                localStorage.setItem("user", JSON.stringify(user));

                window.location.href = "leaderboard.html";

            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
          
                alert(xhr.responseText);
            }
        });


    });
}


$(document).ready(function() {
    nextQuiz();
    modalPaddingSettings();
    modalCloseOpen();
    getLeaderBoard();
    studentLoginForm();
    teacherLoginForm();
    studentSignupForm();
    teacherSignupForm();
});