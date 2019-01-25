import {createComponent, loadComponent, datetimeConvert} from "../helpers/helper";
import JourneyDetail from  "../components/journeyDetail"

class Summary {

    constructor(journey) {
        loadComponent(this.createSummary())
        this.parseJourney(journey)
    }

    createSummary() {
        let content = createComponent('div', {id: 'journey-container'})

        let title = createComponent('h2', {class: 'title'})
        title.innerText = "Journey"

        content.append(title)

        return content
    }

    parseJourney(journey) {
        let chevron = createComponent('span', {})
        chevron.innerText = ">"

        if (journey == null){
            return
        }

        journey.forEach((t) => {
            let summary = createComponent('div', {class: 'summary'})

            let departureDateTime = createComponent('span', {})
            departureDateTime.innerText = datetimeConvert(t.departure_date_time)

            summary.append(departureDateTime, chevron.cloneNode(true))

            let sections = t.sections.filter(array => Object.keys(array).length == 16)

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

            let durationText = createComponent('span', {})
            durationText.innerText = t.durations.total.toString().toHHMMSS()

            durationContainer.append(durationPicto, durationText)

            let walkingContainer = createComponent('span', {})
            let walkingPicto = createComponent('img', {alt: 'walking', src: '/images/Walking.svg', class: 'picto'})

            let walkingText = createComponent('span', {})
            walkingText.innerText = t.durations.walking.toString().toHHMMSS()

            walkingContainer.append(walkingPicto, walkingText)

            let pollutionContainer = createComponent('span', {})
            let pollutionPicto = createComponent('img', {alt: 'co0', src: '/images/co2.svg', class: 'picto'})

            let pollutionText = createComponent('span', {})
            pollutionText.innerText = t.co2_emission.value + ' ' + t.co2_emission.unit

            pollutionContainer.append(pollutionPicto, pollutionText)

            summary.append(arrivalDateTime, durationContainer, walkingContainer, pollutionContainer)

            document.querySelector('#journey-container').append(summary)

            document.querySelector('#journey-container').append(new JourneyDetail(t.sections).content)
        })

        document.querySelectorAll(".summary").forEach((t) => {
          t.addEventListener("click", (e) => {
              e.stopPropagation()
              e.stopImmediatePropagation()
              e.currentTarget.nextSibling.classList.toggle("show")
          });
        })
    }
}

export default function (journey) {
    new Summary(journey)
}
