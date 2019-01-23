import { createComponent, refreshPage, loadComponent } from "../helpers/helper";
import form from './journeyForm'
import user from './user'

const datasetToComponent = {
    'form': form,
    'user': user,
};

//History saved to react from back !!! (On sauvegarde l'historique du component et on le recharge)


const links =
    [
        {
            name: 'Home', //Etat du traffic
            component: 'home'
        },
        {
            name: 'Utilisateur',
            component: 'user'
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
            e.preventDefault()
            refreshPage()
            datasetToComponent[e.target.dataset.href]()
        }

        const nav = createComponent('nav',{ class: ['navbar','navbar-expand-lg','navbar-light', 'bg-light'] })
        const ul = createComponent('ul', { class: ['navbar-nav', 'mr-auto'] })
        const div = createComponent('div', {class: ['collapse', 'navbar-collapse'] })
        div.append(ul)
        nav.append(div)
        this.links.forEach(({ name, component }) => {
            const li = createComponent('li', { class: 'nav-item' })
            const a = createComponent('a', { 'data-href': component, class: 'nav-link' })
            a.innerText = name
            a.onclick = changePage
            li.append(a)
            ul.append(li)
        });
        document.getElementById('app').append(nav)
    }

}

let nav = new Navigator(links)
nav.buildNavigator()