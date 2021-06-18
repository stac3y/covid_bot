const axios = require("axios").default;
require('custom-env').env('staging');

let service = {};

service.getByCountry = (country) => {
    let options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: {country: country},
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.API_HOST
        }
    };
    return axios.request(options);
};

module.exports = service;