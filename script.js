var api, userInput;
function myFunction() {
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
        var urlLink = "https://en.wikipedia.org/?curid=" + json.query.search[i].pageid;
        $("#results").append("<a target='_blank' href=" + urlLink + ">" + json.query.search[i].snippet + "</a><br>");
      }//end for
    },//end processJson
    error:
    function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
  });//end .ajax
};//end myFunction()

// var wikiApi = "https://en.wikipedia.org/w/api.php?action=query&titles="+userInput+"&prop=revisions&rvprop=content&format=json";
