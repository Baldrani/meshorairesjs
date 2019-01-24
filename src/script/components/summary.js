import {createComponent, loadComponent, datetimeConvert} from "../helpers/helper";

class Summary {

    constructor(journey) {
        loadComponent(this.createSummary())
        this.parseJourney(journey)
    }

    createSummary() {
        let content = createComponent('div', {id: 'summary-container'})

        let title = createComponent('h2', {class: 'title'})
        title.innerText = "Journey"

        content.append(title)

        return content
    }

    parseJourney(journey) {
        console.log(journey)

        let chevron = createComponent('span', {})
        chevron.innerText = ">"

        journey.forEach((t) => {
            let summary = createComponent('div', {class: 'summary'})

            let departureDateTime = createComponent('span', {})
            departureDateTime.innerText = datetimeConvert(t.departure_date_time)

            summary.append(departureDateTime, chevron.cloneNode(true))

            let sections = t.sections.filter(array => Object.keys(array).length == 16)

            console.log(sections)

            sections.forEach((t) => {
                let section = createComponent('span', {})

                let picto = createComponent('img', {alt: t.display_informations.commercial_mode, src: '/images/Train.svg', class: 'picto'})
                section.append(picto)

                if (t.display_informations.code != "") {
                    let code = createComponent('span', {class: 'with-bg-color'})
                    code.innerText = t.display_informations.code
                    code.style.backgroundColor = '#' + t.display_informations.color

                    section.append(code)
                }
                summary.append(section, chevron.cloneNode(true))
            })

            let arrivalDateTime = createComponent('span', {})
            arrivalDateTime.innerText = datetimeConvert(t.arrival_date_time)

            let durationContainer = createComponent('span', {})
            let durationPicto = createComponent('img', {alt: 'duration', src: '/images/duration.svg', class: 'picto'})
            durationContainer.innerText = t.durations.total.toString().toHHMMSS()
            durationContainer.append(durationPicto)

            let walkingContainer = createComponent('span', {})
            let walkingPicto = createComponent('img', {alt: 'walking', src: '/images/Walking.svg', class: 'picto'})
            walkingContainer.innerText = t.durations.walking.toString().toHHMMSS()
            walkingContainer.append(walkingPicto)

            let pollutionContainer = createComponent('span', {})
            let pollutionPicto = createComponent('img', {alt: 'co0', src: '/images/co2.svg', class: 'picto'})
            pollutionContainer.innerText = t.co2_emission.value + ' ' + t.co2_emission.unit
            pollutionContainer.append(pollutionPicto)

            summary.append(arrivalDateTime, durationContainer, walkingContainer, pollutionContainer)

            document.querySelector('#summary-container').append(summary)
        })
    }
}

export default function (journey) {
    new Summary(journey)
}
