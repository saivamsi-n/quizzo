
function studentSignupForm(){
  console.log("into signupstudent");
  $( "form#student-signup-form" ).submit(function( event ) {
      list = $( this ).serializeArray();
      console.log( list );
      var values = {};
      $.each(list, function(i, field) {
           values[field.name] = field.value;
       });
      console.log(values);
      event.preventDefault();


      $.ajax({
        url : "http://127.0.0.1:8000/quizzo/student/signup/", // the endpoint
        type : "POST", // http method
        'contentType': 'application/json',
        data : JSON.stringify(values), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(data) {
            //$('#post-text').val(''); // remove the value from the input
           // console.log(json); // log the returned json to the console
            console.log("student success");
            var user={};
            user.id = data.id;
            user.username=data.username;
            localStorage.setItem("user", JSON.stringify(user));
             
            console.log(localStorage.getItem('user'));
            
             window.location.href = "competetion.html";

             // another sanity check
           // $('#countdown').html(new Date(json['time'])).css('color','white');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            //alert("offset is invalid");
        }
    });

  });

}


function teacherSignupForm(){
  console.log("into signupteacher");
  $( "form#teacher-signup-form" ).submit(function( event ) {
      list = $( this ).serializeArray();
      console.log( list );
      var values = {};
      $.each(list, function(i, field) {
           values[field.name] = field.value;
       });
      console.log(values);
      event.preventDefault();


      $.ajax({
        url : "http://127.0.0.1:8000/quizzo/teacher/signup/", // the endpoint
        type : "POST", // http method
        'contentType': 'application/json',
        data : JSON.stringify(values), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(data) {
            //$('#post-text').val(''); // remove the value from the input
           // console.log(json); // log the returned json to the console
            console.log("student success");
            var user={};
            user.id = data.id;
            user.username=data.username;
            user.user_type="teacher";
            localStorage.setItem("user", JSON.stringify(user));
            
            window.location.href = "leaderboard.html";  
             // another sanity check
           // $('#countdown').html(new Date(json['time'])).css('color','white');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            //alert("offset is invalid");
        }
    });

  });

}


function studentSignupForm(){
  console.log("into signupstudent");
  $( "form#student-signup-form" ).submit(function( event ) {
      list = $( this ).serializeArray();
      console.log( list );
      var values = {};
      $.each(list, function(i, field) {
           values[field.name] = field.value;
       });
      console.log(values);
      event.preventDefault();


      $.ajax({
        url : "http://127.0.0.1:8000/quizzo/student/signup/", // the endpoint
        type : "POST", // http method
        'contentType': 'application/json',
        data : JSON.stringify(values), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(data) {
            //$('#post-text').val(''); // remove the value from the input
           // console.log(json); // log the returned json to the console
            console.log("student success");
            var user={};
            user.id = data.id;
            user.username=data.username;
            user.user_type="student";
            localStorage.setItem("user", JSON.stringify(user));
             
            console.log(localStorage.getItem('user'));
            
             window.location.href = "competetion.html";

             // another sanity check
           // $('#countdown').html(new Date(json['time'])).css('color','white');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            //alert("offset is invalid");
        }
    });

  });

}


function teacherSignupForm(){
  console.log("into signupteacher");
  $( "form#teacher-signup-form" ).submit(function( event ) {
      list = $( this ).serializeArray();
      console.log( list );
      var values = {};
      $.each(list, function(i, field) {
           values[field.name] = field.value;
       });
      console.log(values);
      event.preventDefault();


      $.ajax({
        url : "http://127.0.0.1:8000/quizzo/teacher/signup/", // the endpoint
        type : "POST", // http method
        'contentType': 'application/json',
        data : JSON.stringify(values), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(data) {
            //$('#post-text').val(''); // remove the value from the input
           // console.log(json); // log the returned json to the console
            console.log("student success");
            var user={};
            user.id = data.id;
            user.username=data.username;
            user.user_type="teacher";
            localStorage.setItem("user", JSON.stringify(user));
            
            window.location.href = "leaderboard.html";  
             // another sanity check
           // $('#countdown').html(new Date(json['time'])).css('color','white');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            //alert("offset is invalid");
        }
    });

  });

}



function studentLoginForm(){
  $( "form#student-login-form" ).submit(function( event ) {
      list = $( this ).serializeArray();
      console.log( list );
      var values = {};
      $.each(list, function(i, field) {
           values[field.name] = field.value;
       });
      console.log(values);
      event.preventDefault();


      $.ajax({
        url : "http://127.0.0.1:8000/quizzo/student/login/", // the endpoint
        type : "POST", // http method
        'contentType': 'application/json',
        data : JSON.stringify(values), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(data) {
            //$('#post-text').val(''); // remove the value from the input
           // console.log(json); // log the returned json to the console
            console.log("success");
            // another sanity check

            var user={};
            user.id = data.id;
            user.username=data.username;
            user.user_type="student";
            localStorage.setItem("user", JSON.stringify(user));
            console.log(localStorage.getItem("user"));
            window.location.href = "competetion.html";
           // $('#countdown').html(new Date(json['time'])).css('color','white');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            //alert("offset is invalid");
            alert(xhr.responseText);
        }
    });

  });
}

function teacherLoginForm(){
  $( "form#teacher-login-form" ).submit(function( event ) {
      list = $( this ).serializeArray();
      console.log( list );
      var values = {};
      $.each(list, function(i, field) {
           values[field.name] = field.value;
       });
      console.log(values);
      event.preventDefault();


      $.ajax({
        url : "http://127.0.0.1:8000/quizzo/teacher/login/", // the endpoint
        type : "POST", // http method
        'contentType': 'application/json',
        data : JSON.stringify(values), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(data) {
            //$('#post-text').val(''); // remove the value from the input
           // console.log(json); // log the returned json to the console
            var user={};
            user.id = data.id;
            user.username=data.username;
            user.user_type="teacher";
            localStorage.setItem("user", JSON.stringify(user));
             
            console.log(localStorage.getItem('user'));
            window.location.href = "leaderboard.html";
             // another sanity check
           // $('#countdown').html(new Date(json['time'])).css('color','white');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            //alert("offset is invalid");
            alert(xhr.responseText);
        }
    });



  });
}

  $(document).ready(function(){

    $('.personal-info > div').hide();
     studentLoginForm();
    teacherLoginForm(); 
    studentSignupForm();
    teacherSignupForm();
  });

  
