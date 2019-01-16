/* Récupération du module direct depuis `export default function ()` */
import { createComponent } from "./components/createComponent"
import providers from "./components/provider";
import form from "./components/form.js";
form()

//providers()
//navigator()


let comp = createComponent('Coucou', { 'class': ['x','y','z'], 'data-id': 'test joie bitch' })
document.getElementById('app').append(comp)

import '../style/app.sass'