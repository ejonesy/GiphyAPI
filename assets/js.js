
var topics = ["sad", "angry", "happy", "are you kidding me", "excited", "smitten", "rude", "offended"];

//A function to creat buttons for each item in the topics array that will grab the relevant gifs when clicked on
function displayFeels() {

  $("#feels").empty();

  //A for loop that goes through the topics array and creates a button for each one
  for (var i = 0; i < topics.length; i++) {
    var feelsBadMan = $("<button>");
    feelsBadMan.attr("data-emotion", topics[i]);
    feelsBadMan.text(topics[i]);
    $("#feels").append(feelsBadMan);

  };

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

      //Loops through every result
      for (var i = 0; i < results.length; i++) {

        var emotionDiv = $("<div>");
        //Easier for the code to read by adding a class to the div this way
        emotionDiv.addClass("box");

        //Each image has its GIPHY rating listed
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        //Creates an image tag for each result
        var imageURL = $("<img>");

        //Attaches an object connecting the relevant file paths to the state of the img, to be used later in a new click event
        imageURL.attr({
          "src": results[i].images.fixed_height.url,
          "data-still": results[i].images.fixed_height_still.url,
          "data-animated": results[i].images.fixed_height.url,
          "state": "still"
        });

        //Adds the ratings and images into the div created above
        emotionDiv.append(p);
        emotionDiv.append(imageURL);
        $("#images").prepend(emotionDiv);
        console.log("Rating: ", rating);

      };
    });
  });
  // This function handles events where the add button is clicked
  $("#add-feel").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var newFeels = $("#new-feels").val().trim();

    //Making sure subsequent new buttons don't get repeated    
    if(topics.indexOf(newFeels) == -1) {
      // Adding feeling from the textbox to our array
      topics.push(newFeels);

    // Calling displayFeels to process the array and create a new button for every new feeling added by the user
    displayFeels();
    }
  });

//Code to pause and reanimate gifs when clicked on

  //Selects the images div, but specifies a click event only after the img tags are created after the buttons are clicked above
  $("#images").on("click", "img", function(){

    //Checks if the img being clicked on is still or animated and changes it to the other state
    if($(this).attr("state") === "still") {
      $(this).attr({"src": $(this).attr("data-animated"), "state": "animated"});
      console.log("state: still");
    } else {
      $(this).attr({"src": $(this).attr("data-still"), "state": "still"});
      console.log("state: animated");
    }
  })

}

displayFeels()