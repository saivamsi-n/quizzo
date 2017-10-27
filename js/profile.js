 $(document).ready(function() {
     var test = localStorage.getItem("user-profile-info");
     var user = JSON.parse(test);
     console.log(user.username);

     $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);
     $('a#logout').click(function() {
         window.location.href = "index.html";
     });

     $('input#first_name').val(user.first_name);
     $('input#last_name').val(user.last_name);
     $('input#username').val(user.username);
     $('input#email').val(user.email);
     $('input#school').val(user.school);
     $('input#city').val(user.city);


 });