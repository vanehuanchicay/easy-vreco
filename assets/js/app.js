 
function initMap() {
  var map = new google.maps.Map(document.getElementById('mapa'),{
    zoom: 18,
    center: {lat: -12.1191427, lng: -77.0349046},
    mapTypeControl: false,
    streetViewControl: false
  });
  function search(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
 // document.getElementById('encuentrame').addEventListener('click', search);
  var latitud, longitud;

  var success = function(position){
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;

  var bike ={
    url:'assets/img/bike.svg',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };

  var miUbicacion = new google.maps.Marker({
    position : {lat: latitud, lng: longitud},
    animation: google.maps.Animation.DROP,
    map: map,
    icon: bike
  });

  map.setZoom(18);
  map.setCenter({lat: latitud, lng: longitud});

}
  var error = function(error){
    alert('Tenemos un problema para encontrar tu ubicación');
  }

  var inputStart = document.getElementById('start');
  var inputFinish = document.getElementById('finish');

  new google.maps.places.Autocomplete(inputStart);
  new google.maps.places.Autocomplete(inputFinish);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();
   directionsDisplay.setMap(map);
     var trazarRuta = function(){
     calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);


  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
      directionsService.route({
        origin: inputStart.value,
        destination: inputFinish.value,
        travelMode: 'DRIVING'
      },function(response, status){
      if(status === 'OK'){
        directionsDisplay.setDirections(response);
      }else{
        window.alert('No encontramos una ruta.');
      }
    });
  }
  search();
}
/*

  function initMap() {


  function search(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }
 
  var mapa = document.getElementById('mapa');
  navigator.geolocation.getCurrentPosition(success, error);
  function error(){};

  function success(position){
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  new google.maps.LatLng(lat, long);

  var place = new google.maps.LatLng(lat, long);
  var objConfig = {
    zoom: 17,
    center: place
  };

  var gMap = new google.maps.Map(mapa, objConfig);
  var objConfigMarker = {
    position: place,
    map : gMap
    }
    var gMarker = new google.maps.Marker(objConfigMarker);
  }
  var inputStart = document.getElementById('start');
  var inputFinish = document.getElementById('finish');

  new google.maps.places.Autocomplete(inputStart);
  new google.maps.places.Autocomplete(inputFinish);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;


  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
      directionsService.route({
        origin: inputStart.value,
        destination: inputFinish.value,
        travelMode: 'DRIVING'
      },function(response, status){
      if(status === 'OK'){
        directionsDisplay.setDirections(response);
      }else{
        window.alert('No encontramos una ruta.');
      }
    });

     directionsDisplay.setMap(mapa);
     var trazarRuta = function(){
     calculateAndDisplayRoute(directionsService, directionDisplay);
  };

  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);
  }
}
*/