/* Récupération du module direct depuis `export default function ()` */
import {createComponent} from "./components/createComponent"
import ProviderSNCF from "./components/ProviderSNCF";
import form from "./components/form.js";

form()

//providers()
//navigator()


let comp = createComponent('Coucou', {'class': ['x', 'y', 'z'], 'data-id': 'test joie bitch'})
document.getElementById('app').append(comp)

let provider = new ProviderSNCF()

const $fromId = document.querySelector("#from-id")
const $toId = document.querySelector("#to-id")

const $from = document.querySelector('#from');
const $fromDropdown = document.querySelector('#from-dropdown')

const fromHandler = async function (e) {
    let text = e.target.value;

    if (text.length >= 4) {
        $fromDropdown.innerHTML = ""

        let places = await provider.get('https://api.sncf.com/v1/coverage/sncf/places', {
            q: text,
        })

        places.places.forEach((t) => {
            let fromDropdownItem = createComponent('li', {
                class: 'list-group-item',
                'data-id': t.id,
            })

            fromDropdownItem.innerText = t.name
            $fromDropdown.append(fromDropdownItem)
        })

        $fromDropdown.style.display = 'block'
    } else {
        $fromDropdown.style.display = 'none'
    }
    //$result.innerHTML = e.target.value;
}

$from.addEventListener('input', fromHandler)
$from.addEventListener('focus', fromHandler)


const $to = document.querySelector('#to');
const $toDropdown = document.querySelector('#to-dropdown')

const toHandler = async function (e) {
    let text = e.target.value;

    if (text.length >= 4) {
        $toDropdown.innerHTML = ""

        let places = await provider.get('https://api.sncf.com/v1/coverage/sncf/places', {
            q: text,
        })

        places.places.forEach((t) => {
            let toDropdownItem = createComponent('li', {
                class: 'list-group-item',
                'data-id': t.id,
            })

            toDropdownItem.innerText = t.name
            $toDropdown.append(toDropdownItem)
        })

        $toDropdown.style.display = 'block'
    } else {
        $toDropdown.style.display = 'none'
    }
    //$result.innerHTML = e.target.value;
}

$to.addEventListener('input', toHandler)
$to.addEventListener('focus', toHandler)

document.querySelector("#from-dropdown").addEventListener("click", function (e) {
    if (e.target && e.target.matches("li")) {
        $fromId.value = e.target.dataset.id
        $from.value = e.target.innerText
        $fromDropdown.style.display = 'none'
    }
});

document.querySelector("#to-dropdown").addEventListener("click", function (e) {
    if (e.target && e.target.matches("li")) {
        $toId.value = e.target.dataset.id
        $to.value = e.target.innerText
        $toDropdown.style.display = 'none'
    }
});

const submit = async function (e) {
    let journey = await provider.get('https://api.sncf.com/v1/coverage/sncf/journeys', {
        from: $fromId.value,
        to: $toId.value ,
        datetime: document.querySelector("#date").value.replace(/-|:/gi, '')
    })

    console.log(journey)
}

document.querySelector("#submit").addEventListener("click", submit);

import '../style/app.sass'


