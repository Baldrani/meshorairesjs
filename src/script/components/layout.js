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
        const welcomeImage = createComponent('img', {src: "./images/home.png", style: "max-width: 100%"})
        pageContent.append(welcomeImage)
        nav()
        container.append(pageContent)
        document.getElementById('app').append(container)
    }
}

export default () => {
    new Layout()
}