import { createComponent } from "../helpers/helper";
import nav from './navigator'

class Layout{
    constructor(){
        this.createLayout()
    }

    /**
     * This is where you buidl the layout of the app
     */
    createLayout(){
        const container = createComponent('div', {class: 'container'})
        const pageContent = createComponent('div', {id: 'pageContent'})
        nav()
        container.append(pageContent)
        document.getElementById('app').append(container)
    }
}

export default () => {
    new Layout()
}