/* Export direct. */

export default function () {
    let form = document.createElement('form')
    form.setAttribute('method',"post");
    form.setAttribute('action',"/");

    let fromGroup = document.createElement('div')
    fromGroup.setAttribute('class', 'form-group')

    let fromLabel = document.createElement('label')
    fromLabel.setAttribute('for',"from");
    fromLabel.innerText = "From :"

    let from = document.createElement('input')
    from.setAttribute('type',"text");
    from.setAttribute('name',"from");
    from.setAttribute('id',"from");
    from.setAttribute('class', 'form-control')

    let toGroup = document.createElement('div')
    toGroup.setAttribute('class', 'form-group')

    let toLabel = document.createElement('label')
    toLabel.setAttribute('for',"from");
    toLabel.innerText = "To :"

    let to = document.createElement('input')
    to.setAttribute('type',"text");
    to.setAttribute('name',"to");
    to.setAttribute('id',"to");
    to.setAttribute('class', 'form-control')

    let dateGroup = document.createElement('div')
    dateGroup.setAttribute('class', 'form-group')

    let dateLabel = document.createElement('label')
    dateLabel.setAttribute('for',"from");
    dateLabel.innerText = "At :"

    let date = document.createElement('input')
    date.setAttribute('type',"datetime-local");
    date.setAttribute('name',"date");
    date.setAttribute('id',"date");
    date.setAttribute('class', 'form-control')


    fromGroup.append(fromLabel, from)

    toGroup.append(toLabel, to)

    dateGroup.append(dateLabel, date)


    form.append(fromGroup, toGroup, dateGroup)

    return document.querySelector('#app').append(form)
}