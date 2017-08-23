var api, userInput, img, newResImg, origImgWidth;
$("input").on("keyup", function(event) {
  if (event.which == 13) {
    $("#results").empty();
    userInput = $("input").val();
    //add "&gsroffset=num" to get next num pages in search result
    //get those results and append to results area to do custom infinite scroll
    api = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro&exsentences=2&generator=search&gsrsearch=" + userInput + "&format=json";
    $.ajax({
      url: api,
      dataType: "jsonp",
      // jsonp: "jsoncallback",
      success:
      function processJson(json){
        var pages = json.query.pages;
        var pageIdKeys = Object.keys(pages);
        for (var i = 0; i < pageIdKeys.length; i++){
          if (json.query.pages[pageIdKeys[i]].hasOwnProperty('thumbnail')) {
            origImgWidth = json.query.pages[pageIdKeys[i]].thumbnail.width;
            img = json.query.pages[pageIdKeys[i]].thumbnail.source;
            newResImg = img.replace(origImgWidth, "100");
          }
          var title = json.query.pages[pageIdKeys[i]].title;
          var extract = json.query.pages[pageIdKeys[i]].extract;
          var urlLink = "https://en.wikipedia.org/?curid=" + json.query.pages[pageIdKeys[i]].pageid;
          $("#results").append(
            "<a target='_blank' href=" + urlLink + ">" +
              "<div>" +
                "<span id='title'>" + title + "</span><br>" +
                (json.query.pages[pageIdKeys[i]].hasOwnProperty('thumbnail') ? "<img src=" + newResImg + "><br>" : "") +
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
//see note at the very top



/*******/
/*NOTES*/
/*******/
//hasOwnProperty used to cover cases where result doesn't have thumbnail;
//without it, we'll get a typeerror and the rest of the results will not append to the dom
