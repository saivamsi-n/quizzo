//base Url
var baseUrl = "https://quizzo-api.herokuapp.com/";

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
  })


   
});

    var test = localStorage.getItem("user");
    user = jQuery.parseJSON(test);
    var student_username = localStorage.getItem("student-username");
    $('a#name').html('<span class="glyphicon glyphicon-user"></span>  '+user.username);

    $('a#logout').click(function(){
      window.location.href = "index.html";
       localStorage.clear();
    });







function renderTable(offset,limit){

       $.ajax({
        url : baseUrl+"quizzo/student/"+student_username+"/quizzes/",
        'contentType': 'application/json',
        method:"POST",
        data : JSON.stringify({ "offset":offset,"limit":limit}), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success : function(data) {
            //$('#post-text').val(''); // remove the value from the input
           console.log("inquizzes");
            total = data.total;
            var table = $('table#table-quizboard tbody');
            table.html('');
            quizzes=data.quizzes;
        for( obj in quizzes){
          var forhtml = '<tr>';
            forhtml+="<td><a href='#' class='check'>"+quizzes[obj].title+"</a></td>";
            forhtml+="<td>"+quizzes[obj].marks+"</td>";
            forhtml+="<td>"+quizzes[obj].grade+"</td>";
            forhtml+='</tr>';
          table.append(forhtml);

        }
           //navigateTable(data);
        },

        // handle a non-successful response
        error : function(xhr,errmsg,err) {
           alert("Couldnt fetch quizzes");
         }
    });


    }
    var position=1;
 $('#previous-button').click(function(){
          
        if(position!=1){
          position--;
            offset-=5;
            limit-=5;
            renderTable(offset,limit);
            position++;
            $('#next-button').show();
        }
    });
   
   $('#next-button').click(function(){
          position++;
         if(limit>total){
          limit=total;
          offset+=5;
          renderTable(offset,limit,filter_by,search);
          $(this).hide();
         }
         else{
          limit+=5;
          offset+=5;
          renderTable(offset,limit);
         }
    });
   
$(document).ready(function(){
  renderTable(0,5);

});
$(window).on('load',function () {
 $(document).on('click', 'a.check', function(){
   quizTitle= $(this).text();
  
    var test = localStorage.setItem("reference-quiz-title",quizTitle);
    window.location.href="answers.html";
});
});


$("a#name").click(function(event) {
    console.log("working");
    var test = localStorage.getItem("user");
    user = jQuery.parseJSON(test);
    console.log(user.username);
    data = {
        "id": user.id,
        "username": user.username,
        "user_type": user.user_type
    };
    console.log(data);
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
            $
                alert("Couldnt fetch User Details");
        }

    });
});