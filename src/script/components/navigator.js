import { createComponent, refreshPage, loadComponent } from "../helpers/helper";
import form from './journeyForm'
import user from './user'

const datasetToComponent = {
    'form': form,
    'user': user,
};

//TODO History saved to react from back !!! (On sauvegarde l'historique du component et on le recharge)

const linksApp = [
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

    constructor(links = linksApp){
        this.links = links
        this.buildNavigator()
    }

    buildNavigator()
    {
        const nav = createComponent('nav',{ class: ['navbar','navbar-expand-lg','navbar-light', 'bg-light'] })
        const ul = createComponent('ul', { class: ['navbar-nav', 'mr-auto'] })
        const div = createComponent('div', {class: ['collapse', 'navbar-collapse'] })
        div.append(ul)
        nav.append(div)
        this.links.forEach(({ name, component }) => {
            const li = createComponent('li', { class: 'nav-item' })
            const a = createComponent('a', { 'data-href': component, class: 'nav-link' })
            a.innerText = name
            a.onclick = this.changePage
            li.append(a)
            ul.append(li)
        });
        document.getElementById('app').append(nav) //TODO modifier
    }

    changePage(e){
        e.preventDefault()
        refreshPage()
        //actualState =
        history.pushState({}, "", e.target.dataset.href)
        datasetToComponent[e.target.dataset.href]()
    }

}

export default function(){
    new Navigator();
}
