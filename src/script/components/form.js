/* Export direct. */
import { createComponent } from "./globalFunctions";

export default function () {
    let form = createComponent('form', { method: 'post', action: '/' })

    let fromGroup = createComponent('div', { class: 'form-group' })

    let fromLabel = createComponent('label', { for: "from" })
    fromLabel.innerText = "From :"

    let from = createComponent('input', { type: 'text', name: 'from', id: 'from', class: 'form-control' })

    let toGroup = createComponent('div', {class: 'form-group' })

    let toLabel = createComponent('label', { for: 'from' })
    toLabel.innerText = "To :"

    let to = createComponent('input', {type: 'text', name: 'to', id: 'to', class: 'form-control' })

    let dateGroup = createComponent('div', { class: 'form-group' })

    let dateLabel = createComponent('labe', { for: 'from' })
    dateLabel.innerText = "At :"

    let date = createComponent('input', { type: 'datetime-local', name: 'date', id: 'date', class: 'form-control' })

    fromGroup.append(fromLabel, from)
    toGroup.append(toLabel, to)
    dateGroup.append(dateLabel, date)
    form.append(fromGroup, toGroup, dateGroup)

    return form
}