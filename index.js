/*
  This function takes in two parameters: a number, and a string.
  The number represents the amount of hours/minutes/seconds.
  The string represents the unit, and is one of
    * "hour"
    * "minute"
    * "second"

  It returns a whole number value from 0-255 representing the
  relative CSS RGB value of that time period.

  It's pre-written for you. Best to not muck around with it.
*/
var convertTimeframe = function(amount, unit) {

  switch (unit) {
    case "hour":
    case "hours":
      return Math.round((amount / 23) * 255)
    case "minute":
    case "minutes":
    case "second":
    case "seconds":
      return Math.round((amount / 59) * 255)
    default:
      return 0;
  }
}

/* Function to convert 0..255 R,G,B values to a hexidecimal color string */

var RGBToHex = function(r,g,b){
    var bin = r << 16 | g << 8 | b;
    return (function(h){
        return new Array(7-h.length).join("0")+h
    })(bin.toString(16).toUpperCase())
}

$(document).ready(function(){
   
// retrieve the current time 
  var getTime = function() {
    
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
 
 // Solve formatting for single digit times
    if (s < 10) {
        s = "0" + s;
      }
    if (m < 10) {
        m = "0" + m;
      }
    if (h < 10) {
      h = "0" + h;
    }

    // Display the time on the page - update clock's text
    $(".clock").text(h + ":" + m + ":" + s);

    // Do the same for color
    var r = convertTimeframe(h, "hours");
    var g = convertTimeframe(m, "minutes");
    var b = convertTimeframe(s, "seconds");
    var bgColor = RGBToHex(r,g,b);

    // Change the background color
    $(".container").css("background-color", "#" + bgColor);

    // Set value of hex div
    $(".hex").text("#" + bgColor);

    // Update time/color every second
    setTimeout(function() {
      getTime();
    }, 1000);


  }
  // Call the function to add start values
  getTime();

  // When clicked, toggle hidden class on hex and clock divs
  $(document).on("click", function() {
    $(".clock").toggleClass("hidden");
    $(".hex").toggleClass("hidden");
  })

});






