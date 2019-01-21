/**
 * Requête simple :
 * ----------------
 * axios
 * .get('https://api.coindesk.com/v1/bpi/currentprice.json')
 * .then(response => (this.info = response.data.bpi))
 * .catch(error => console.log(error))
 *
 * Requête multiple :
 * ------------------
    axios.all([
        axios.get('/api/seat/models'),
        axios.get('/api/volkswagen/models')
        ])
        .then(axios.spread(function (seat, volkswagen) {
        let vehicles = seat.data.concat(volkswagen.data);
        this.setState({ vehicles: vehicles })
        }))
        //.then(response => this.setState({ vehicles: response.data }))
        .catch(error => console.log(error));
 */

var description = new Vue({
    el: "#description",
    data: {
        description: null,
    },
    created: function () {
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1658021547630800',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.2'
            });

            FB.api(
                "/357781158359111/ratings?access_token=EAAXj9jlgYNABAC0OcbzabhVquWuCwyZAu5KF3RIZAioNG9seIQZCLvvQCeJXvdl1RygrNA3oLddKtbXDiZARaZAWsyKBnzZC6nZClFkADaHzJDLMep7sIQV0HvjQybcyAZBfgEsiAfp0cMZAi7OyYaqpNZAKJBELDdMUj5xfHnpUEc9dNhXVoOpHeLX0bovKhVuCZCyHD5pKj5OhAZDZD",
                function (response) {
                    console.log("truc");
                    if (response && !response.error) {
                    console.log(response);
                    this.description = response;
                    }else{
                        console.log("truc");
                    }
                }
            );


            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) { return; }
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/fr_FR/sdk/xfbml.customerchat.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        }
    },
    
    mounted(){ // Equivalent on ready en Jquery
        return axios
            .get("./data/description.json").then(response => {
                //this.description = response.data.description
            })
    }
})