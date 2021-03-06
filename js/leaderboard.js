//base Url
var baseUrl = "https://quizzo-api.herokuapp.com/";

var test = localStorage.getItem("user");
var user = jQuery.parseJSON(test);
$(document).ready(function(e) {

    $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);
    $('a#logout').click(function() {
        window.location.href = "index.html";
         localStorage.clear();
    });


    $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);
    if (user.user_type == "student") {

        $('a#check').text('COMPETITION');
        $("a#check").attr("href", "competition.html");
    } else {
        $('a#check').text('STUDENTS');
        $("a#check").attr("href", "students.html");
    }


    var filter_by;
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        filter_by = $(this).text();
        $('.search-panel span#search_concept').text(filter_by);
        $('.input-group #search_param').val(param);
    });


    renderTable(0, 5, "all", "");

    $('#search-button').click(function() {
        var search = $('#search').val();
        startRenderTable(filter_by, search);
    });

    function startRenderTable(var1, var2) {

        var position = 1;
        var offset = 0;
        var limit = 5;
        var total;
        var filter_by = var1;
        var search = var2;
        renderTable(offset, limit, filter_by, search);
        $('#previous-button').click(function() {

            if (position != 1) {
                position--;
                offset -= 5;
                limit -= 5;
                renderTable(offset, limit, filter_by, search);
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
                renderTable(offset, limit, filter_by, search);
            }
        });

    }

    function renderTable(offset, limit, filter, search) {

        $.ajax({
            url: baseUrl+"quizzo/leaderboard/",
            type: "POST",
            'contentType': 'application/json',
            data: JSON.stringify({
                "offset": offset,
                "limit": limit,
                "filter_by": filter,
                "search": search
            }), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {
                total = data.total;
                var table = $('table#table-leaderboard tbody');
                table.html('');
                students = data.students;
                if (data.students.length > 0) {
                    for (obj in students) {
                        var forhtml = '<tr>';
                        forhtml += "<td>" + students[obj].username + "</td>";
                        forhtml += "<td>" + students[obj].points + "</td>";
                        forhtml += "<td>" + students[obj].college + "</td>";
                        forhtml += '</tr>';
                        table.append(forhtml);
                    }
                }
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
               console.log("Couldnt fetch leaderboard details");
            }
        });


    }
    $("a#name").click(function(event) {

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
                alert("Couldnt fetch User ProfileDetails");
            }

        });
    });

});