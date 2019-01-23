import {objectToQueryString, appendQueryStringToURL} from "./helper";
//TODO require('dotenv').config()

export default class ProviderSNCF {
    async get(url, params, callback) {

        params.token = '4434290e-24c3-47f0-a984-8524a09c049a'

        let queryParams = objectToQueryString(params)

        let myHeaders = new Headers();
        myHeaders.append("Authorization", "4434290e-24c3-47f0-a984-8524a09c049a");

        let myInit = {
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        const response = await fetch(appendQueryStringToURL(url, queryParams), myInit)
        const json = await response.json();

        return json

        //return response.json()

    }

}