//to get users position
var latitude, longitude;
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      $("#loc").html("latitude: " + latitude + "<br>longitude: " + longitude);
      $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&APPID=c213f9ca1b6333f1b214582c52904e92", function(result) {
        //update parameters
        console.log("hello");
        console.log("rs :", result);
        tmpC = Math.floor(result.main.temp);
        $("#tmp").html(tmpC + "&#8451");
        $("#plc").val(result.name + "," + result.sys.country);
      });
    });
  } else {
    $("#loc").html("Geolocation is not supported by this browser.");
  }
});
function handle(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    //search by value
    var res = document.getElementById('plc').value;
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + res + "&units=metric&APPID=c213f9ca1b6333f1b214582c52904e92", function(val) {
      tmpC = Math.floor(val.main.temp);
      $("#tmp").html(tmpC + "&#8451");
    });
  }
}
