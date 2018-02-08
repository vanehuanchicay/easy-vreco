 
function initMap() {
  var map = new google.maps.Map(document.getElementById('mapa'),{
    zoom: 15,
    center: {lat: -12.1191427, lng: -77.0349046},
    mapTypeControl: false,
    streetViewControl: false
  });
  function search(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  var bike = {
    url:'assets/img/bike.svg',
    scaledSize: new google.maps.Size(50, 50),
    anchor: new google.maps.Point(5,10)
  };
 // document.getElementById('encuentrame').addEventListener('click', search);
  
  var latitud, longitud;

  var success = function(position){
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;

  
  var miUbicacion = new google.maps.Marker({
    position : {lat: latitud, lng: longitud},
    animation: google.maps.Animation.BOUNCE,
    map: map,
    icon: bike
  });
  map.setZoom(15);
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
  var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});

   directionsDisplay.setMap(map);
     var trazarRuta = function(){
     calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);
  function makeMarker(position, icon, title){
    new google.maps.Marker({
      position: position,
      map: map,
      icon: bike,
      title:title
    });

  }
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay){
      directionsService.route({
        origin: inputStart.value,
        destination: inputFinish.value,
        travelMode: 'DRIVING'
      },function(response, status){
      if(status === 'OK'){
        directionsDisplay.setDirections(response);
        var leg = response.routes[ 0 ].legs[ 0 ];
        makeMarker(leg.start_location, bike, 'Origen');
        makeMarker(leg.end_location, bike, 'Destino');
      }else{
        window.alert('No encontramos una ruta.');
      }
    });
  }
  search();
}