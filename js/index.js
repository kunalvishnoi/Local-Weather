//to get users position
var latitude, longitude;
//function for celsius and fahrenheit conversion
function change(tp) {
  var tmpF = Math.floor((tp * 1.8) + 32);
  if ($('input[type=checkbox]').prop('checked') ){
    $("#tmp").html(tmpF +"&#8457");
  } else {
    $("#tmp").html(tp+"&#8451");
  }
}
function change_icon (desc) {
  switch(desc) {
    case 'Drizzle':addi(desc);
      break;
    case  'Clouds': addi(desc);
      break;
    case 'Rain':addi(desc);
      break;
    case 'Snow':addi(desc);
      break;
    case 'Clear':addi(desc);
      break;
    case 'Thunderstorm':addi(desc);
      break; default:$('div.Clouds').removeClass('hide');
             }
}
function rmvi(){
  if($('div.Clouds').is(":visible")) {
    $("div.Clouds").addClass("hide");
  }
  if($('div.Drizzle').is(":visible")) {
   $("div.Drizzle").addClass("hide");
  }
  if($('div.Thunderstorm').is(":visible")) {
    $("div.Thunderstorm").addClass("hide");
  }
if($('div.Snow').is(":visible")) {
    $("div.Snow").addClass("hide");
  }
  if($('div.Clear').is(":visible")) {
    $("div.Clear").addClass("hide");
  }
  if($('div.Rain').is(":visible")) {
    $("div.Rain").addClass("hide");
  }
} 

function addi(desc) {
  $('div.' + desc).removeClass('hide');
}
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      rmvi();
      $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&APPID=c213f9ca1b6333f1b214582c52904e92", function(result) {
        //update parameters
        console.log("hello");
        console.log("rs :", result);
        tmpC = Math.floor(result.main.temp);
        $("#tmp").html(tmpC + "&#8451");
        $("#plc").val(result.name + "," + result.sys.country);
        $("#cont").html(result.weather[0].description);  
        $("input[type=checkbox]").on("click",function(){
       change(tmpC); 
      });
        change_icon(result.weather[0].main);
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
    $('input[type=checkbox]').prop('checked', false);
    rmvi();
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + res + "&units=metric&APPID=c213f9ca1b6333f1b214582c52904e92", function(val) {
      tmpC = Math.floor(val.main.temp);
      $("#tmp").html(tmpC + "&#8451");
      $("#cont").html(val.weather[0].description); 
      $("input[type=checkbox]").on("click",function(){
       change(tmpC); 
      });
      change_icon(val.weather[0].main);
    });
  }
}
