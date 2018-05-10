// Markers appear when the user clicks on the map.
// Each marker is labeled with a single alphabetical character.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

function initialize() {
  var self = this;
  var BoulderCO = {lat: 40.04999923706055, lng:-105.20999908447266};

  ///////////////////////////////////////////////////////////////
  // var elementVal = document.querySelector("#id_dataTable").textContent;
  //
  // var elementLatVal = document.querySelector("#id_dataTableLat").textContent;
  // var elementLat = Number(elementLatVal); //parseInt(elementLatVal)
  //
  // var elementLngVal = document.querySelector("#id_dataTableLon").textContent;
  // var elementLng = Number(elementLngVal); //parseInt(elementLngVal)
  // for (var i = 0; i < this.myRespArray.length; i++) {
  //   var BoulderCO = {lat: this.myRespArray[i].lat, lng: this.myRespArray[i].lon};
  //var BoulderCO = {lat: $("#id_dataTableLat"), lng: $("#id_dataTableLon")};
   // var BoulderCO = {lat: elementLat, lng: elementLng};
  ///////////////////////////////////////////////////////////////

  var map = new google.maps.Map(document.getElementById('map'), {
  center: BoulderCO,
  zoom: 8
  });

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  // Add a marker at the center of the map.
  addMarker(self.BoulderCO, map);
}

// Adds a marker to the map.
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


// id="map" MAP-API
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    // pass in BoulderCO
    // Goole Map API -- lat + lng
    // Meetup API -- lat + lon
    center: self.BoulderCO,
    zoom: 8
  });
}
