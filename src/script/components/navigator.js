/* Export direct. */
export default function () {
    let nav = document.createElement('nav')
    let ul = document.createElement('ul')
    let navlink = ['User', 'FDP']
    navlink.forEach( (t) => {
        ul.append(t)
    })
    nav.append(ul)
    return document.querySelector('#app').append(nav)
}