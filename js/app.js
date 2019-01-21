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
        window.fbAsyncInit = function() {
            FB.init({
              appId            : '1658021547630800',
              autoLogAppEvents : true,
              xfbml            : true,
              version          : 'v2.12'
            });
        
            
            FB.api(
                "/357781158359111/ratings?access_token=EAAXj9jlgYNABAK1kkx9CaQVGrxKcj1YrQxYmz9qYQGN4pBztk3TvZCc8w51m2Y41XSZBb4laJB8nDdOxmNdmSgVH00nF2F0zdeFnj4mUjphFOPAa5qz41PwvkiggBoowBZBr6FpPWhLNvZBCxp2fwboIWpW5RraZCRlydeunfWafn1iCzGePS",
                function (response) {
                    if (response && !response.error) {
                    console.log(response);
                    }
                }
            );
            
          };
    },
    
    mounted(){ // Equivalent on ready en Jquery
        return axios
            .get("./data/description.json").then(response => {
                //this.description = response.data.description
            })
    }
})