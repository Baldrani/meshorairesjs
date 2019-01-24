import { createComponent, refreshPage, propAccess } from "../helpers/helper";
import form from './journeyForm'
import user from './user'

const datasetToComponent = {
    'form': form,
    'user': user,
};


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
        this.historyNavigation()
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

    changePage(e){ //TODO Understand why first one is not working
        e.preventDefault()
        refreshPage()
        //propAccess(history, 'history.state.last')
        history.pushState({ last: history.state === null ? e.target.dataset.href :'home' }, "", e.target.dataset.href)
        datasetToComponent[e.target.dataset.href]()
    }

    historyNavigation(){
        window.onpopstate = () => {
            refreshPage()
            datasetToComponent[history.state.last]()
        }
    }

}

export default function(){
    new Navigator();
}
