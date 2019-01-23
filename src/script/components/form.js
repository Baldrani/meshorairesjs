/* Export direct. */
import { createComponent } from "./globalFunctions";
import ProviderSNCF from "./ProviderSNCF"; //@TODO Base directory


export default function () {
    let form = createComponent('form', { method: 'post', action: '/' })

    let fromId = createComponent('input', { type: 'hidden', name: 'fromId', id: 'from-id' })
    let toId = createComponent('input', { type: 'hidden', name: 'toId', id: 'to-id' })

    let fromGroup = createComponent('div', { class: 'form-group' })

    let fromLabel = createComponent('label', { for: "from" })
    fromLabel.innerText = "From :"

    let from = createComponent('input', { type: 'text', id: 'from', class: 'form-control', autocomplete: 'off' })

    let fromDropdown = createComponent('ul', { class: 'list-group', id: 'from-dropdown' })

    let toGroup = createComponent('div', {class: 'form-group' })

    let toLabel = createComponent('label', { for: 'from' })
    toLabel.innerText = "To :"

    let to = createComponent('input', {type: 'text', id: 'to', class: 'form-control', autocomplete: 'off' })

    let toDropdown = createComponent('ul', { class: 'list-group', id: 'to-dropdown' })

    let dateGroup = createComponent('div', { class: 'form-group' })

    let dateLabel = createComponent('labe', { for: 'from' })
    dateLabel.innerText = "At :"

    let date = createComponent('input', { type: 'datetime-local', name: 'date', id: 'date', class: 'form-control' })

    let submit = createComponent('input', { type: 'button', id: 'submit', class: 'btn btn-primary' })
    submit.value = "Submit"

    fromGroup.append(fromLabel, from, fromDropdown)
    toGroup.append(toLabel, to, toDropdown)
    dateGroup.append(dateLabel, date)
    form.append(fromId, toId, fromGroup, toGroup, dateGroup, submit)

    return form
}

export function loadForm(){

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
}