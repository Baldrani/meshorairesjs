/* Export direct. */
import { createComponent } from "./createComponent";

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

    return document.querySelector('#app').append(form)
}