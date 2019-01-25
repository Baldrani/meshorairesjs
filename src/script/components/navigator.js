import { createComponent, refreshPage, propAccess } from "../helpers/helper";
import '../helpers/helper'
import home from './home'
import user from './user'
import form from './journeyForm'

const datasetToComponent = {
    'form': form,
    'favoris': home
};


const linksApp = [
    {
        name: 'Favoris',
        component: 'favoris'
    },
    {
        name: 'Formulaire',
        component: 'form'
    }
]

const userConnected = null


class Navigator {

    constructor(links = linksApp){
        this.setUser()
        this.links = links
        this.buildNavigator()
        this.historyNavigation()
    }

    buildNavigator()
    {
        const nav = createComponent('nav',{ class: ['navbar','navbar-expand-lg','navbar-light', 'bg-light'] })
        const ul = createComponent('ul', { class: ['navbar-nav', 'mr-auto'] })
        const div = createComponent('div', {class: ['navbar-collapse'] })
        const welcomeMessage = "Bonjour {{ user.name }}"
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
        const userDiv = createComponent('div')
        userDiv.innerHTML = welcomeMessage.interpolate(JSON.parse(localStorage.getItem('user')))
        div.append(userDiv)
        document.getElementById('app').append(nav) //TODO modifier
    }

    changePage(e){
        e.preventDefault()
        refreshPage()
        history.pushState({ last: propAccess(history, 'history.state.last') === null ? e.target.dataset.href :'home' }, "", e.target.dataset.href)
        datasetToComponent[e.target.dataset.href]()
    }

    historyNavigation(){
        window.onpopstate = () => {
            refreshPage()
            datasetToComponent[history.state.last]()
        }
    }

    setUser() {
        let name = prompt("Please enter your name", "User");

        let user = { user: { name: name } }

        localStorage.setItem('user', JSON.stringify(user))

    }

}

export default function(){
    new Navigator();
}
