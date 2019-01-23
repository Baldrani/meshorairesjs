export function objectToQueryString(obj) {
    return Object.keys(obj || {})
        .filter((key) => {
            return ((obj[key] !== '') &&
                (obj[key] !== null));
        })
        .map((key) => {

            const value = (typeof obj[key] === 'function') ?
                encodeURIComponent(obj[key]()) :
                encodeURIComponent(obj[key]);

            return `${key}=${value}`;

        }).join('&')
}

export function appendQueryStringToURL(url, queryString) {

    const mark = (queryString) ? (((url || '').indexOf('?') === -1) ? '?' : '&') : '';

    return `${url}${mark}${queryString}`;
}

export function isString(name)
{
    if (typeof name !== "string") throw "Parameter is not a String!";
    return true
}

/**
 * Build a htlm tag with his attributs
 * name : String
 * attributs : Object { 'class': ['x','y','z'], 'data-id': 'test test2' }
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
    //const comp = name()
    //document.getElementById('app').append(comp)
    document.getElementById('app').append(name)
}