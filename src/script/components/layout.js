import { createComponent } from "../helpers/helper";
import nav from './navigator'

class Layout{
    constructor(){
        this.createLayout()
    }
    /**
     * This is where you build the layout of the app
     */
    createLayout(){
        const container = createComponent('div', {class: 'container'})
        const pageContent = createComponent('div', {id: 'pageContent', class: 'my-5'})
        nav()
        container.append(pageContent)
        document.getElementById('app').append(container)
    }
}

export default () => {
    new Layout()
}