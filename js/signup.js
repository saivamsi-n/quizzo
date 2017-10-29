//base Url
var baseUrl = "https://quizzo-api.herokuapp.com/";

function studentSignupForm() {
    $("form#student-signup-form").submit(function(event) {
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();

        checkPasswordsMatch(values);

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


function teacherSignupForm() {
    $("form#teacher-signup-form").submit(function(event) {
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();
        checkPasswordsMatch(values);

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
                user.user_type = "teacher";
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
        console.log(list);
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        console.log(values);
        event.preventDefault();
        checkPasswordsMatch(values);

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
                user.user_type = "student";
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
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();
        checkPasswordsMatch(values);

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
                user.user_type = "teacher";
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

function checkPasswordsMatch(values){
     if(values['password']!=values['password1']){
          alert("passswords doesnot match");
          return;
        }
}

$(document).ready(function() {

    $('.personal-info > div').hide();
    studentLoginForm();
    teacherLoginForm();
    studentSignupForm();
    teacherSignupForm();
});