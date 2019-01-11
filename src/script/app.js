/* Récupération du module direct depuis `export default function ()` */
import tools from "./components/navigator.js";
/* Récupération des exports nommés du module avec `export function <name>()` */
import { addition, substraction, multiplication, division } from "./components/navigator.js";
/* Variables à tester. */
var number1 = 13,
    number2 = 7.7;
/* Utilisation des fonctions de nos modules. */
console.log('addition', addition(number1, number2));
console.log('substraction', substraction(number1, number2));
console.log('multiplication', multiplication(number1, number2));
console.log('division', division(number1, number2));
console.log('round', tools(number2).round);
console.log('floor', tools(number2).floor);
console.log('ceil', tools(number2).ceil);

//div = document.createElement('div')
//div.innerHTML = "Test"

//const app = document.getElementById('app')

//document.getElementById('app').append(div)