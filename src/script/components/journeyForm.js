import {createComponent, loadComponent, loaderStart, loaderStop, refreshContainer} from "../helpers/helper";
import ProviderSNCF from "../providers/ProviderSNCF";
import Summary from "../components/summary"


class JourneyForm {

    constructor() {
        loadComponent(this.createForm())
        this.loadForm()
    }

    createForm() {
        let form = createComponent('form', {method: 'post', action: '/'})

        let fromId = createComponent('input', {type: 'hidden', name: 'fromId', id: 'from-id'})
        let toId = createComponent('input', {type: 'hidden', name: 'toId', id: 'to-id'})

        let fromGroup = createComponent('div', {class: 'form-group'})

        let fromLabel = createComponent('label', {for: "from"})
        fromLabel.innerText = "From :"

        let from = createComponent('input', {type: 'text', id: 'from', class: 'form-control', autocomplete: 'off'})

        let fromDropdown = createComponent('ul', {class: 'list-group', id: 'from-dropdown'})

        let toGroup = createComponent('div', {class: 'form-group'})

        let toLabel = createComponent('label', {for: 'from'})
        toLabel.innerText = "To :"

        let to = createComponent('input', {type: 'text', id: 'to', class: 'form-control', autocomplete: 'off'})

        let toDropdown = createComponent('ul', {class: 'list-group', id: 'to-dropdown'})

        let dateGroup = createComponent('div', {class: 'form-group'})

        let dateInputGroup = createComponent('div', {class: 'input-group'})

        let dateLabel = createComponent('label', {for: 'from'})
        dateLabel.innerText = "At :"

        let date = createComponent('input', {type: 'datetime-local', name: 'date', id: 'date', class: 'form-control'})

        let dateButtonGroup = createComponent('div', {class: 'input-group-append'})

        let dateButton = createComponent('button', {type: 'button', id: 'dateNow', class: 'btn btn-outline-secondary'})
        dateButton.innerText = "Now"

        let submit = createComponent('input', {type: 'button', id: 'submit', class: 'btn btn-primary'})
        submit.value = "Submit"

        fromGroup.append(fromLabel, from, fromDropdown)
        toGroup.append(toLabel, to, toDropdown)

        dateButtonGroup.append(dateButton)

        dateInputGroup.append(date, dateButtonGroup)
        dateGroup.append(dateLabel, dateInputGroup)
        form.append(fromId, toId, fromGroup, toGroup, dateGroup, submit)

        return form
    }

    loadForm() {
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

        document.querySelector("#dateNow").addEventListener("click", function (e) {
            document.querySelector("#date").value = new Date().toJSON().slice(0, 16)
        });

        const submit = async function (e) {
            loaderStart()

            if (!validateForm()) {
                loaderStop()
                return false
            }

            refreshContainer('#journey-container')


            let journey = await provider.get('https://api.sncf.com/v1/coverage/sncf/journeys', {
                from: $fromId.value,
                to: $toId.value,
                datetime: document.querySelector("#date").value.replace(/-|:/gi, '')
            })

            new Summary(journey.journeys)
            loaderStop();

        }

        document.querySelector("#submit").addEventListener("click", submit);
    }
}

function validateForm() {
    if (document.querySelector("#from").value == "" || document.querySelector("#to").value == "" || document.querySelector("#date").value == "") {
        alert("Tous les champs ne sont pas remplis")
        return false
    }

    return true
}

export default function () {
    new JourneyForm()
}
