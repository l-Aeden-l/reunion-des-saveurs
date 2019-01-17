var mymap = "map";
var token = "pk.eyJ1IjoicmRzYXZldXJzIiwiYSI6ImNqcXRvZXMzejAzYTQ0NG1xNmJzazB0Y3EifQ.XPvunr4OtPogVK9L2Ln2jA";
var zoomLevel = 13;
var latitude = -20.9066966;
var longitude = 55.4960876;
//, 20.9079 55.5033



var mymap = L.map('map').setView([latitude, longitude], zoomLevel);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+token+'', {
    maxZoom: 18,
    id: 'mapbox.streets'
}).addTo(mymap);

L.marker([latitude, longitude]).addTo(mymap)
.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

L.circle([latitude, longitude], {
    color: 'black',
    fillColor: '#101011',
    fillOpacity: 0.5,
    radius: 1000
}).addTo(mymap);

var popup = L.popup();