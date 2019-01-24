import {createComponent, loadComponent, datetimeConvert} from "../helpers/helper";

class JourneyDetail {

    constructor(sections) {
        this.content = this.createJourneyDetail(sections)
    }

    createJourneyDetail(sections) {
        let content = createComponent('div', {class: 'journey-detail'})

        sections.forEach((t) => {
            console.log(t)
            let step = createComponent('span', {class: 'detail'})

            if (t.type == 'transfer' || t.type == 'crow_fly') {
                let walkingPicto = createComponent('img', {alt: 'walking', src: '/images/Walking.svg', class: 'picto'})

                let text = createComponent('span', {})
                text.innerHTML = `Walking from <strong>${t.from.name}</strong> to <strong>${t.to.name}</strong> during ${t.duration.toString().toHHMMSS()}`

                step.append(walkingPicto, text)
            } else if (t.type == 'public_transport') {
                let picto = createComponent('img', {
                    alt: t.display_informations.commercial_mode,
                    src: '/images/Train.svg',
                    class: 'picto'
                })
                step.append(picto)

                if (t.display_informations.code != "") {
                    let code = createComponent('span', {class: 'with-bg-color'})
                    code.innerHTML += t.display_informations.code
                    code.style.backgroundColor = '#' + t.display_informations.color
                    step.append(code)
                }

                let text = createComponent('span', {})
                text.innerHTML = ` >  ${t.display_informations.direction} from  <strong>${t.from.name}</strong> at ${datetimeConvert(t.base_departure_date_time)} to <strong>${t.to.name}</strong> at ${datetimeConvert(t.base_arrival_date_time)} during ${t.duration.toString().toHHMMSS()}`

                step.append(text)
            } else if (t.type == 'waiting') {
                let durationPicto = createComponent('img', {
                    alt: 'duration',
                    src: '/images/duration.svg',
                    class: 'picto'
                })

                let text = createComponent('span', {})
                text.innerHTML = `Waiting during ${t.duration.toString().toHHMMSS()}`

                step.append(durationPicto, text)
            }

            content.append(step)

        })

        console.log(content)

        return content
    }

}

export default function (sections) {
    return new JourneyDetail(sections)
}
