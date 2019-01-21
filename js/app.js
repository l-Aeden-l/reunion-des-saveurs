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
    mounted(){ // Equivalent on ready en Jquery
        return axios
            .get("./data/description.json").then(response => {
                this.description = response.data.description
            })
    }
})