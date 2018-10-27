var queryString;
var limit;
var apikey = 'IYaKRIOYBzBbbeFTN1B2yEdy46Fl0mvv';
$("#submit").on("click", function (event) {
    event.preventDefault(); // Preventing page refresh on button click
    queryString = $("#queryString").val().trim();
    limit = $("#limit").val();
    render();
})


$(document).on("click", ".gif-button", function (event) {

    event.preventDefault();
    // $("#img-gif").empty();


    var queryString = $(this).attr("data-name");

    var settings = {
        "url": "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&q=" + queryString + "&limit=" + limit,
        "method": "GET"
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        for (i = 0; i < response.data.length; i++) {
            console.log(response.data[i].images.fixed_height.url);
            var imgURL = response.data[i].images.fixed_height.url;
            var imgStill = response.data[i].images.fixed_height_still.url;
            var image = $("<img>").attr("src", imgStill);
            image.addClass("img");
            image.attr("data-still", imgStill);
            image.attr("data-animate", imgURL);
            image.attr("data-state", "still");
            $("#img-gif").prepend(image);
        }
    });
})


$(document).on("click", ".img", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        var animateData = $(this).attr("data-animate")
        $(this).attr("src", animateData);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


function render() {
    var newGifs = $("<button>");
    var newData = queryString
    newGifs.attr("data-name", newData);
    newGifs.addClass('gif-button');
    newGifs.addClass('btn btn-info');
    newGifs.text(queryString);

    $("#new-gifs").append(newGifs);
}