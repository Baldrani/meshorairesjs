import {objectToQueryString, appendQueryStringToURL} from "./helper";
// require('dotenv').config()

export default class ProviderSNCF {
    constructor() {
        this.init();
    }

    async init() {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "4434290e-24c3-47f0-a984-8524a09c049a");

        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        const response = await fetch('https://api.sncf.com/v1/coverage', myInit)
        const json = await response.json();
        console.log(json);
    }


    get(url, params, callback) {

        params.token = '4434290e-24c3-47f0-a984-8524a09c049a'

        let queryParams = objectToQueryString(params)

        return fetch(appendQueryStringToURL(url, queryParams));

    }

}