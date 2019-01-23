import {createComponent, loadComponent} from "../helpers/helper";
import ProviderSNCF from "../providers/ProviderSNCF";


class Summary {

    constructor(journey) {
        console.log(journey)
        loadComponent(this.createSummary())
        this.parseJourney(journey)
    }

    createSummary() {
        let content = createComponent('div', {})

        let title = createComponent('h2', {class: 'title'})
        title.innerText = "Journey"

        let summary = createComponent('div', {class: 'summary'})

        content.append(title, summary)

        return content
    }

    parseJourney(journey) {
        console.log(journey)
    }
}

export default function () {
    new Summary()
}
