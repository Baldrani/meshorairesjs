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
        /*
        let test = "Type d'animal: {{ type.name }}"
        let animal = {type: {name: "chien"}}
        console.log(test.interpolate(animal))
        */
        const container = createComponent('div', {class: 'container'})
        const pageContent = createComponent('div', {id: 'pageContent', class: 'my-5'})
        nav()
        container.append(pageContent)
        document.getElementById('app').append(container)
        //nav.changePage('home')
    }
}

export default () => {
    new Layout()
}