$(document).ready(function(){
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
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
  


  $(window).scroll(function() {
    $(".slideanim").each(function(){
      var pos = $(this).offset().top;

      var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
          $(this).addClass("slide");
        }
    });
  });
});

function modalCloseOpen(){
     $("a#signupinlogin").click(function(event){
           $('#loginModal').modal('hide'); 
           event.preventDefault();
    });
      $("#loginModal").on('shown.bs.modal', function () {
           
            $('body').addClass('check');
			
    }).on('hidden.bs.modal', function(){

    			$('body').removeClass('check');
    });

}

function modalPaddingSettings(){


var fixedCls = '.navbar-fixed-top,.navbar-fixed-bottom';
    var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function () {
        oldSSB.apply(this);
        if (this.bodyIsOverflowing && this.scrollbarWidth)
            $(fixedCls).css('padding-right', this.scrollbarWidth);
    }

    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function () {
        oldRSB.apply(this);
        $(fixedCls).css('padding-right', '');
    }
}
function contactForm(){
$('#contact-submit-form').submit(function(){
    list = $( this ).serializeArray();
      console.log( list );
      var values = {};
      $.each(list, function(i, field) {
           values[field.name] = field.value;
       });
    console.log("adada");
    $.ajax({
        url : "http://127.0.0.1:8000/quizzo/contact/", // the endpoint
        type : "POST", // http method
        data : JSON.stringify(values),
        crossDomain: true,
        // handle a successful response
        success : function(json) {
            //$('#post-text').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success");
             // another sanity check
            window.location.href="leaderboard.html";
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });

});
}
function nextQuiz(){
  console.log("create post is working!"); // sanity check
    $.ajax({
        url : "http://127.0.0.1:8000/quizzo/next_quiz/", // the endpoint
        type : "GET", // http method
        //data : { the_post : $('#post-text').val() }, // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(json) {
            //$('#post-text').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success");
             // another sanity check
            $('#countdown').html(json['time']).css('color','white');
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
        }
    });
}

function getLeaderBoard(){
  console.log("leaderboard is working!"); // sanity check
    $.ajax({
        url : "http://127.0.0.1:8000/quizzo/leaderboard/", // the endpoint
        type : "POST", // http method
        'contentType': 'application/json',
        data : JSON.stringify({ "offset":0,"limit":10,"filter_by":"all","search":""}), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(json) {
            //$('#post-text').val(''); // remove the value from the input
            console.log(json); // log the returned json to the console
            console.log("success");
            $(function () {
              $('#table-leaderboard').bootstrapTable({
                 data: json['students']
              });
              $('.fixed-table-loading').html("");
            });
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
            console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            
        }
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
            user.user_type=data.user_type;
            localStorage.setItem("user", JSON.stringify(user));
             
            console.log(localStorage.getItem('user'));
            
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
            user.user_type=data.user_type;
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
            user.user_type=data.user_type;
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
            user.user_type=data.user_type;
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
            alert(xhr.responseText);
        }
    });



  });
}


$(document).ready(function(){
    nextQuiz();
    modalPaddingSettings();
    modalCloseOpen();
    getLeaderBoard();
    studentLoginForm();
    teacherLoginForm();
    studentSignupForm();
    teacherSignupForm();
    contactForm();
});
