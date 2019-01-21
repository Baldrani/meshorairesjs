/* Récupération du module direct depuis `export default function ()` */
import { createComponent } from "./components/createComponent"
import ProviderSNCF from "./components/ProviderSNCF";
import form from "./components/form.js";
form()

//providers()
//navigator()


let comp = createComponent('Coucou', { 'class': ['x','y','z'], 'data-id': 'test joie bitch' })
document.getElementById('app').append(comp)

let provider = new ProviderSNCF()

setTimeout(function(){
    provider.get('https://api.sncf.com/v1/coverage/sncf/journeys', {from: '2.3749036%3B48.8467927', to: '2.2922926%3B48.8583736', datetime: '20190117T000000'})
}, 1000);

import '../style/app.sass'