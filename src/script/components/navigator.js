import { createComponent, refreshPage, loadComponent } from "./globalFunctions";
import form from './form'
import { loadForm } from './form'
import savedJourney from './savedJourney'

const datasetToComponent = {
    'form': form
};

//History saved to react from back !!! (On sauvegarde l'historique du component et on le recharge)


const links =
    [
        {
            name: 'Home',
            component: 'test'
        },
        {
            name: 'Mes Parcours',
            component: 'savedJourney'
        },
        {
            name: 'Formulaire',
            component: 'form'
        }
    ]


class Navigator {
    constructor(links){
        this.links = links
    }

    buildNavigator()
    {
        function changePage(e){
            refreshPage()
            loadComponent(datasetToComponent[e.target.dataset.component])
            loadForm() //TODO TO REMOVE
        }

        const nav = document.createElement('nav')
        const ul = document.createElement('ul')
        nav.append(ul)
        this.links.forEach(({ name, component }) => {
            const li = createComponent('li', {'data-component': component } )
            li.innerText = name
            li.onclick = changePage
            ul.append(li)
        });
        document.getElementById('app').append(nav)
    }

}

let nav = new Navigator(links)
nav.buildNavigator()