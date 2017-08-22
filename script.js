var api, userInput;
$("input").on("keyup", function(event) {
  if (event.which == 13) {
    $("#results").empty();
    userInput = $("input").val();
    api = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&exsentences=2&generator=search&gsrsearch=" + userInput + "&format=json";
    $.ajax({
      url: api,
      dataType: "jsonp",
      // jsonp: "jsoncallback",
      success:
      function processJson(json){
        var pages = json.query.pages;
        var pageIdKeys = Object.keys(pages)
        for (var i = 0; i < pageIdKeys.length; i++){
          var origImgWidth = json.query.pages[pageIdKeys[i]].thumbnail.width;
          var img = json.query.pages[pageIdKeys[i]].thumbnail.source;
          var newResImg = img.replace(origImgWidth, "100");
          var title = json.query.pages[pageIdKeys[i]].title;
          var extract = json.query.pages[pageIdKeys[i]].extract;
          var urlLink = "https://en.wikipedia.org/?curid=" + json.query.pages[pageIdKeys[i]].pageid;
          $("#results").append(
            "<a target='_blank' href=" + urlLink + ">" +
              "<div>" +
                "<span id='title'>" + title + "</span><br>" +
                "<img src=" + newResImg + "><br>" +
                "<span id='snippet'>" + extract + "</span>" +
              "</div>" +
            "</a>"
          );//end append
        }//end for
      },//end processJson
      error:
      function(XMLHttpRequest, textStatus, errorThrown) {
        alert("Status: " + textStatus); alert("Error: " + errorThrown);
      }
    });//end .ajax
  }//end if

  var inputVal = $("input").val();
  if (inputVal == "") {
    $("#results").empty();
  }
});//end onkeydown

//implement custom infinite scroll
