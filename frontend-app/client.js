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
          version          : 'v2.12'
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


    var products_file = "products.json";
    var menu_formatedContent = "";
    fetch(dataDirectory+"/"+products_file)
    .then(res => res.json())
    .then(data => {
        for (const key in data) {
            menu_formatedContent += `<h2>${data[key].name}</h2>`;
                products = data[key].products;
                for(const key in products){
                    menu_formatedContent += `
                        <div class="col-md-12">
                            <div class="card">
                                <div class="row ">
                                    <div class="col-md-4">
                                        <img src="${products[key].imgUrl}" class="w-100">
                                    </div>
                                    <div class="col-md-8 align-self-center">
                                        <div class="card-body">
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

})