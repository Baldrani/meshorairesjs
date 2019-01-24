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

export function isString(name) {
    if (typeof name !== "string") throw "Parameter is not a String!";
    return true
}

/**
 * Build a htlm tag with his attributs
 * name : String
 * attributs : Object { 'class': ['x','y','z'], 'data-id': 'test test2' }
 */
export function createComponent(name, attributs) {
    isString(name)
    const el = document.createElement(name)

    if (attributs === undefined) return el; //If no attributs specifieds return the element

    for (const [key, values] of Object.entries(attributs)) {
        let value;
        value = (typeof values === "object") ? values.join(' ') : values //Case of an array
        el.setAttribute(key, value)
    }
    return el
}

export function refreshPage() {
    //TODO Add a loader swang
    const pageNode = document.getElementById('pageContent')
    while (pageNode.firstChild) {
        pageNode.removeChild(pageNode.firstChild);
    }
}

export function loadComponent(name) {
    document.getElementById('pageContent').append(name)
}

export function datetimeConvert(datetime) {
    const parts = datetime.split(/([\d]{4})([\d]{2})([\d]{2})T([\d]{2})([\d]{2}).+/);

    return `${parts[3]}/${parts[2]}/${parts[1]} ${parts[4]}h${parts[5]}`

}

export function propAccess(obj, path){

    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)

}


String.prototype.toHHMMSS = function () {
    let sec_num = parseInt(this, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return hours + 'h' + minutes + 'min' + seconds + 's';
}
