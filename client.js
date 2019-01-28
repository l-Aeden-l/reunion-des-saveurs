document.addEventListener('DOMContentLoaded', function() {

    var dataDirectory = "./data"

    /**
     * ==================================================
     *                   #INFORMATIONS
     * ==================================================
     */
    var description_file = "description.json";
    fetch(dataDirectory+"/"+description_file)
    .then(res => res.json())
    .then(data => {
        description_tag = document.getElementById("description");
        description_tag.innerHTML = data.description;
    })
    .catch(err => console.log(err));

    /**
     * ------------------- FACEBOOK ----------------------
     */
    
    // Facebook Customer Chat (Bulle de discussion en bas de page)
    window.fbAsyncInit = function() {
        FB.init({
          appId            : '1658021547630800',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.6'
        });
    };
    (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    /**
     * ==================================================
     *                   #MENU
     * ==================================================
     */

    // Affichage des produits
    var products_file = "products.json";
    var menu_formatedContent = "";
    fetch(dataDirectory+"/"+products_file)
    .then(res => res.json())
    .then(data => {
        for (const key in data) {
            menu_formatedContent += `<h2>${data[key].name}</h2>`;
            menu_formatedContent += `<div class="row">`;
                products = data[key].products;
                for(const key in products){
                    menu_formatedContent += `
                        <div class="col-md-3 col-sm-4 col-6">
                            <div class="card shadow-sm">
                                <img src="${products[key].imgUrl}" class="image-menu img-fluid" alt="Fanta en canette">
                                <div class="card-body">
                                    <h4 class="card-title">${products[key].name}</h4>
                                <hr>
                                <span class="badge badge-dark">${products[key].price} €</span>
                                </div>
                            </div>
                        </div>
                        `;
                }
            menu_formatedContent += `</div>`;
        }
        var menu_tag = document.getElementById("products");
        menu_tag.innerHTML = menu_formatedContent;
    })
    .catch(err => console.log(err));



    /**
     * ==================================================
     *               #LOCATION (Emplacements)
     * ==================================================
     */

    var mymap = "map";
    var token = "pk.eyJ1IjoicmRzYXZldXJzIiwiYSI6ImNqcXRvZXMzejAzYTQ0NG1xNmJzazB0Y3EifQ.XPvunr4OtPogVK9L2Ln2jA";
    var zoomLevel = 13;
    var latitude = -20.895279;
    var longitude = 55.4961283;

    var mymap = L.map('map').setView([latitude, longitude], zoomLevel);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token='+token+'', {
        maxZoom: 18,
        id: 'mapbox.streets'
    }).addTo(mymap);

    var mapMarkerDirectory = "./assets/js/leaflet/images/"
    var regularIcon = L.icon({
        iconUrl: mapMarkerDirectory+'rds-marker-icon.png',
        shadowUrl: mapMarkerDirectory+'rds-marker-shadow.png',
    
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [45, 41], // size of the shadow
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],  // the same for the shadow
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });
    var activeIcon = L.icon({
        iconUrl: mapMarkerDirectory+'rds-active-marker-icon.png',
        shadowUrl: mapMarkerDirectory+'rds-marker-shadow.png',
    
        iconSize:     [25, 41], // size of the icon
        shadowSize:   [45, 41], // size of the shadow
        iconAnchor:   [12.5, 41], // point of the icon which will correspond to marker's location
        shadowAnchor: [12, 41],  // the same for the shadow
        popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
    });

        // Affichage des emplacements
        var locations_file = "locations.json";
        var weekDays = new Array( "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche" );
        var date = new Date();
        var today = weekDays[date.getDay() - 1];
        today = "Mardi";
        fetch(dataDirectory+"/"+locations_file)
        .then(res => res.json())
        .then(data => {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    console.log(today+" "+element.day);
                    if(today == element.day){
                        L.marker([element.latitude, element.longitude], {icon: activeIcon}).addTo(mymap)
                        .bindPopup(`<b>${element.day}</b><br/>${element.description}`).openPopup();
                    }else{
                        L.marker([element.latitude, element.longitude], {icon: regularIcon}).addTo(mymap)
                        .bindPopup(`<b>${element.day}</b><br/>${element.description}`);
                    }
                }
            }
        })
        .catch(err => console.log(err));

    var popup = L.popup();

})