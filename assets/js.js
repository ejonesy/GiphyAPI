
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

    //Why does this original code not work?
    /*$("#feels").append("<button>" + topics[i] + "</button>");
    //It loops through the whole array and assigns the last item to every button for some reason
    $("button").attr("data-emotion", topics[i]);
    console.log("Button: ", topics[i]);*/

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

        var emotionDiv = $("<div class = 'box'>");

        //Each image has its GIPHY rating listed
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);

        //Creates an image tag for each result
        var imageURL = $("<img>");
        imageURL.attr("src", results[i].images.fixed_height.url);

        //Adds the ratings and images into the div created above
        emotionDiv.append(p);
        emotionDiv.append(imageURL);
        $("#images").prepend(emotionDiv);
        console.log("Rating: ", rating);

        //Code to pause and reanimate gifs when clicked on
        //Don't really understand how to get still images as well or where to store them or if they even need to be stored. Shouldn't it be possible to call them with .ajax like I call the moving gifs?

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
  });
  // This function handles events where the add button is clicked
  //It's not working properly yet
  $("#add-feel").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var newFeels = $("#your-feels").val().trim();

    // Adding feeling from the textbox to our array
    topics.push(newFeels);

    // Calling displayFeels to process the array
    displayFeels();
  });

};

displayFeels()


//When each image is clicked, the gif animates
//When the moving gif is clicked, it "pauses"

//A form that takes in user input to make new buttons

