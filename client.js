document.addEventListener('DOMContentLoaded', function() {

    /**
     *     ---------- Utilitaires ----------
     */

    var getTodayName = function(language){
        weekDays_en = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        weekDays_fr = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        date = new Date();
        today_en = weekDays_en[date.getDay()];
        today_fr = weekDays_fr[date.getDay()];
        return (language == "fr")? today_fr : today_en;
    }

    var dataDirectory = "./data";
    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    /**
     * ==================================================
     *                   #INFORMATIONS
     * ==================================================
     */
    var description_file = "description.json";
    fetch(dataDirectory+"/"+description_file)
    .then(res => res.json())
    .then(data => {
        description_id = document.getElementById("description");
        description_id.innerHTML = data.description;
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

        var temp = "357781158359111";
        const FB_token = "EAAXj9jlgYNABAK1kkx9CaQVGrxKcj1YrQxYmz9qYQGN4pBztk3TvZCc8w51m2Y41XSZBb4laJB8nDdOxmNdmSgVH00nF2F0zdeFnj4mUjphFOPAa5qz41PwvkiggBoowBZBr6FpPWhLNvZBCxp2fwboIWpW5RraZCRlydeunfWafn1iCzGePS";
        var slider_formatedContent = "";
        var rating_formatedContent = "";
        var reviewText_counter = 0;
        FB.api('/me/ratings', 'GET', {"access_token":""+FB_token+"","fields":"review_text,reviewer{name,picture.type(large)}"}, function(response) {
                if (response && !response.error) {
                        for (const key in response) {
                            if (response.hasOwnProperty(key)) {
                                const row = response[key];
                                for (const key in row) {
                                    if (row.hasOwnProperty(key)) {
                                        currentItem = row[key];
                                        if (currentItem.hasOwnProperty("review_text")){
                                            reviewText_counter++;
                                            rating_formatedContent += `
                                                <div class="carousel-item ${(key+1 == 1)? "active" : ""}">
                                                    <div class="row">
                                                        <div class="col">
                                                            <div class="card shadow-sm">
                                                                <img src="${currentItem.reviewer.picture.data.url}" class="image-menu img-fluid">
                                                                <div class="card-body">
                                                                    <h4 class="card-title text-center">${currentItem.reviewer.name}</h4>
                                                                    <hr>
                                                                    <p class="text-justify">${currentItem.review_text}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            `;
                                        }
                                    }
                                }
                            }
                        }

                    slider_formatedContent += `<div id="slider_a_1" class="carousel slide columns_move_1 swipe_x ps_slowSpeedy" data-ride="carousel" data-pause="hover" data-interval="false" data-duration="500" data-column="${reviewText_counter}" data-m1200="4" data-m992="3" data-m768="2" data-m576="1">`;
                    slider_formatedContent += `<div class="carousel-inner" role="listbox">`;
                    slider_formatedContent += rating_formatedContent;
                    slider_formatedContent += `</div>`;
                    slider_formatedContent += `<a class="carousel-control-prev ps_control_left ps_top_left_x" href="#slider_a_1" data-slide="prev">
                    <i class="fas fa-angle-left"></i></a>`;
                    slider_formatedContent += `<a class="carousel-control-next ps_control_right ps_top_right_x" href="#slider_a_1" data-slide="next">
                    <i class="fas fa-angle-right"></i></a>`;
                    slider_formatedContent += `</div>`;

                    var rating_id = document.getElementById("ratings");
                    rating_id.innerHTML = slider_formatedContent;
                    bs4carousels();
                }else{
                    console.log(response.error);
                }
            }
        );
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
            products = data[key].products;
            productNumber = Object.size(products);
            if(productNumber > 1){
                menu_formatedContent += `<h2>${data[key].name}</h2>`;
                menu_formatedContent += `<div id="slider_b_${key+1}" class="carousel slide columns_move_1 swipe_x ps_slowSpeedy" data-ride="carousel" data-pause="hover" data-interval="false" data-duration="300" data-column="${(productNumber < 4)? productNumber : 4}" data-m1200="4" data-m992="3" data-m768="2" data-m576="1">`;
                menu_formatedContent += `<div class="carousel-inner" role="listbox">`;
                    for(const key in products){
                        menu_formatedContent += `
                            <div class="carousel-item ${(key+1 == 1)? "active" : ""}">
                                <div class="row">
                                    <div class="col">
                                        <div class="card shadow-sm">
                                            <img src="${products[key].imgUrl}" class="image-menu img-fluid" alt="Fanta en canette">
                                            <div class="card-body text-center">
                                                <h4 class="card-title">${products[key].name}</h4>
                                            <hr>
                                            <span class="badge badge-dark">${products[key].price} €</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
                    }
                menu_formatedContent += `</div>`;
                menu_formatedContent += `<a class="carousel-control-prev ps_control_left ps_top_left_x" href="#slider_b_${key+1}" data-slide="prev">
                <i class="fas fa-angle-left"></i></a>`;
                menu_formatedContent += `<a class="carousel-control-next ps_control_right ps_top_right_x" href="#slider_b_${key+1}" data-slide="next">
                <i class="fas fa-angle-right"></i></a>`;
                menu_formatedContent += `</div>`;
            }else{
                menu_formatedContent += `<h2>${data[key].name}</h2>`;
                menu_formatedContent += `<div class="row">`;
                    for(const key in products){
                        menu_formatedContent += `
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="row ">
                                        <div class="col-md-4">
                                            <img src="${products[key].imgUrl}" class="w-100">
                                        </div>
                                        <div class="col-md-8 align-self-center"> 
                                        <div class="card-body text-center">
                                            <h4 class="card-title">${products[key].name}</h4>
                                            <hr>
                                            <span class="badge badge-dark">${products[key].price} €</span>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            `;
                    }
                menu_formatedContent += `</div>`;
            }
        }
        var menu_id = document.getElementById("products");
        menu_id.innerHTML = menu_formatedContent;
        bs4carousels();
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
        var opening = document.getElementById("opening");
        // Par défaut affiche la date du jour comme fermé
        opening_formatedContent = `
        Aujourd'hui nous sommes ${getTodayName("fr")}.<br>
        Réunion des saveurs est fermé !<br>`;        

        fetch(dataDirectory+"/"+locations_file)
        .then(res => res.json())
        .then(data => {
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    // [header#home]
                    // Si c'est un jour d'ouverture on affiche le message sur fond vert avec un lien vers l'emplacement,
                    // sinon on l'affiche sur fond gris.
                    if (element.openingDay){
                        // [section#location #map]
                        // Si la date du jour correspond à l'élément courant, on change la couleur du marqueur en vert, sinon on laisse en noir.
                        if(getTodayName() == element.day){
                            L.marker([element.latitude, element.longitude], {icon: activeIcon}).addTo(mymap)
                            .bindPopup(`<b>${getTodayName("fr")}</b><br/>${element.description}`).openPopup();
                            opening.classList.replace('alert-secondary', 'alert-success');
                            opening_formatedContent = `
                            Aujourd'hui nous sommes ${getTodayName("fr")}.<br>
                            Réunion des saveurs est ouvert !<br>
                            <a class="nav-link js-scroll-trigger text-primary" data-latitude="${element.latitude}" data-longitude="${element.longitude}" href="#location">
                            Voir l'emplacement
                            </a>`;
                        }else{
                            L.marker([element.latitude, element.longitude], {icon: regularIcon}).addTo(mymap)
                            .bindPopup(`<b>${getTodayName("fr")}</b><br/>${element.description}`);
                        }
                    }
                }
            }
            opening.innerHTML = opening_formatedContent;
        })
        .catch(err => console.log(err));

    var popup = L.popup();

    var opening = document.getElementById("opening");
    opening.addEventListener("click", (event) => {
        if (event.target.matches('a')) {
            latitude = event.target.getAttribute("data-latitude");
            longitude = event.target.getAttribute("data-longitude");
            window.setTimeout(() => {
                mymap.setView([latitude, longitude], zoomLevel, { animation: true });                
            }, 1000);
        }
    });
    
})