export function isString(name)
{
    if (typeof name !== "string") throw "Parameter is not a String!";
    return true
}

/**
 *  name : String
 *  attributs : Object { 'class': ['x','y','z'], 'data-id': 'test test2' }
 */
export function createComponent(name, attributs)
{

    isString(name)
    const el = document.createElement(name)

    if(attributs === undefined) return el; //If no attributs specifieds return the element

    for (const [key, values] of Object.entries(attributs)) {
        let value;
        value = (typeof values === "object") ?  values.join(' ') : values //Case of an array
        el.setAttribute(key, value)
    }
    return el
}

export function refreshPage()
{
    //TODO Add a loader swang
    const pageNode = document.getElementById('app')
    while (pageNode.firstChild) {
        pageNode.removeChild(pageNode.firstChild);
    }
}

export function loadComponent(name)
{
    document.getElementById('app').append(name())
}