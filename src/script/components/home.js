class Home {
    constructor() {
        this.loadSaved()
    }

    loadSaved(){
        //TODO Multiple one + change star on save or
        const container = document.createElement('div', {id: 'journey-container'})
        const div = document.createElement('div')
        div.innerHTML = JSON.parse(localStorage.getItem('test'))
        container.append(div)
        document.getElementById('pageContent').append(container)
    }

}

export default function()
{
    new Home()
}