
var topics = ["sad", "angry", "happy", "are you kidding me", "excited", "smitten", "rude", "offended"];

//A for loop that goes through the topics array and creates a button for each one
for (var i = 0; i < topics.length; i++) {
  $("#feels").append("<button>" + topics[i] + "</button>");
  $("button").attr("data-emotion", topics[i]);
  console.log("Button: ", topics[i]);
}

//A click event that uses an ajax call to grab ten static gif images per button click and load them on the page
$("button").on("click", function() {
  var emotion = $(this).attr("data-emotion");
  var apiKey = "&api_key=slXBZitSryxgHeINyd8U7B6XDfGp7p24&limit=10";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + apiKey;
  
  $.ajax({
      url: queryURL,
      method: "GET"
    })
  .then(function(response) {

    console.log("Img: ", response);
    var results = response.data;
    console.log(results);
    for (var i = 0; i < results.length; i++) {

      var emotionDiv = $("<div class = 'box'>");

      //Each image has its GIPHY rating listed
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);

      var imageURL = $("<img>");
      imageURL.attr("src", results[i].images.fixed_height.url);

      emotionDiv.append(p);
      emotionDiv.append(imageURL);
      $("#images").prepend(emotionDiv);
      console.log("Rating: ", rating);

      //Code to pause and reanimate gifs when clicked on
      /*$(".gif").on("click", function() {
        
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
      });*/
    
    };
});
})


//When each image is clicked, the gif animates
//When the moving gif is clicked, it "pauses"

//A form that takes in user input to make new buttons

