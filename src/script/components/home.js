import { createComponent } from "../helpers/helper";

class Home {
    constructor() {
        this.loadSaved()
        this.unstar()
    }

    loadSaved(){
        const container = createComponent('div', {'id': 'journey-container'})
        console.log(container)
        const div = document.createElement('div')
        div.innerHTML = JSON.parse(localStorage.getItem('favorite'))
        container.append(div)
        document.getElementById('pageContent').append(container)
        document.querySelectorAll(".summary").forEach((t) => {
            t.addEventListener("click", (e) => {
                e.stopPropagation()
                e.stopImmediatePropagation()
                if(e.target.classList.contains('star')){
                    return
                } else {
                    e.currentTarget.nextSibling.classList.toggle("show")
                }
            });
        })
    }

    unstar(){
        if(document.querySelector('.star') !== null){
            document.querySelector('.star').addEventListener('click', function(e) {
                e.target.offsetParent.remove()
                localStorage.removeItem('favorite')
            })
        }
    }

}

export default function()
{
    new Home()
}