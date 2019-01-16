import { objectToQueryString, appendQueryStringToURL } from "./helper";
// require('dotenv').config()

export default class ProviderSNCF {
    constructor() {
        // return fetch('http://'+process.env.API_SNCF+'@api.sncf.com/v1/coverage');
        return fetch('http://4434290e-24c3-47f0-a984-8524a09c049a@api.sncf.com/v1/coverage');
    }


    static fetch(url, params, callback){

        let queryParams = '';

        params.forEach( (t) => {
            queryParams += objectToQueryString(t)
        });

        return fetch(appendQueryStringToURL(url, queryParams));

    }

}