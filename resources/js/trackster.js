// http://ws.audioscrobbler.com/2.0/?method=track.search&track=sonata&api_key=8eb71be6081906f5dae22951b458e0fc&format=json

var Trackster = {};

var API_KEY = '8eb71be6081906f5dae22951b458e0fc';

$(document).ready(function() {
  $("#search").click(function() {
    var $input = $("input").val();
    Trackster.searchTracksByTitle($input);
  });
  $("input").keydown(function(event) {
    if (event.which == 13) {
      var $input = $("input").val();
      Trackster.searchTracksByTitle($input);
    }
  });


});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {

  $("#results").empty();

  for (var i = 0; i < tracks.length; i++) {
    var htmlTrackRow =
    '<div class="row result">' +
    ' <div class="col-xs-1 col-xs-offset-1">' +
    '   <a href="' + tracks[i].url + '" target="_blank">' +
    '     <i class="fa fa-play-circle-o fa-2x col-xs-1" aria-hidden="true" id="play"></i>' +
    '   </a>' +
    ' </div>' +
    ' <div class="col-xs-4">' + tracks[i].name + '</div>' +
    ' <div class="col-xs-2">' + tracks[i].artist + '</div>' +
    ' <div class="col-xs-2">' +
    '   <img src="' + tracks[i].image[1]["#text"] + '" alt="image">' +
    ' </div>' +
    ' <div class="col-xs-2">' + numeral(tracks[i].listeners).format("0,0") + '</div>' +
    '</div>';

    $("#results").append(htmlTrackRow);

  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json",
    datatype: "jsonp",
    success: function(data) {
        Trackster.renderTracks(data.results.trackmatches.track);
      }
  });
};
