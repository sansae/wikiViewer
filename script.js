var api, userInput;
$("input").on("keyup", function(event) {
  if (event.which == 13) {
    $("#results").empty();
    userInput = $("input").val();
    api = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + userInput + "&format=json";
    $.ajax({
      url: api,
      dataType: "jsonp",
      // jsonp: "jsoncallback",
      success:
      function processJson(json){
        for (var i = 0; i < json.query.search.length; i++){
          var title = json.query.search[i].title;
          var snippet = json.query.search[i].snippet;
          var urlLink = "https://en.wikipedia.org/?curid=" + json.query.search[i].pageid;
          $("#results").append(
            "<a target='_blank' href=" + urlLink + ">" +
              "<div>" +
                "<span id='title'>" + title + "</span><br>" +
                "<span id='snippet'>" + snippet + "</span>" +
              "</div>" +
            "</a>"
          );
        }//end for
      },//end processJson
      error:
      function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
      }
    });//end .ajax
  }//end if

  var inputVal = $("input").val();
  console.log(inputVal);
  if (inputVal == "") {
    $("#results").empty();
  }
});//end onkeydown

//implement custom infinite scroll
