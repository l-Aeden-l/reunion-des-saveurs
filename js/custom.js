/**
 * Code pour les avis et le chat Facebook
 */

window.fbAsyncInit = function() {
    FB.init({
      appId            : '1658021547630800',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v2.12'
    });

    /*
    FB.api(
        "/357781158359111/ratings?access_token=EAAPxdxZAi8p0BAEMng1SI92uRJzZBilE0tKnvMOZCZC0AcazQDhd6YZCPN4uDEeFMtJkJNZCqZAHYCCzn8tYgY3XaYYy0VelBkthViGHFLLbvl0MZBy8w3Rrv1ZCE2kkwelYVXzZAqBZCXWygsdkz9rDhxKVbTBCvrRplbRfhauI7uRMnozMbZC9WEgqAFxC7mB0qjaOg0MsbGruuQZDZD",
        function (response) {
            if (response && !response.error) {
            console.log(response);
            }
        }
    );
    */
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


/**
 * Code pour la carte du site
 */

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