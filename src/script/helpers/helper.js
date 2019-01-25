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

function type_check(val, conf) {
    return (conf.type ? typeof val === conf.type : true)
        && (conf.value ? val === conf.value : true)
        && (conf.enum ? conf.enum.includes(val) : true)
}

export function isString(name) {
    if (!type_check(name, {type: 'string'})) throw "Parameter is not a String!";
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
    const pageNode = document.getElementById('pageContent')
    while (pageNode.firstChild) {
        pageNode.removeChild(pageNode.firstChild);
    }
}

export function refreshContainer(container) {
    const pageNode = document.querySelector(container)

    if (pageNode  !== null) {
        pageNode.remove()
    }
}

export function loaderStart() {
    let loader = createComponent('img', {id: 'loader', src: '/images/loader.svg', class: 'loader'})
    document.getElementById('app').append(loader)
}

export function loaderStop() {
    document.getElementById('loader').remove()
}

export function loadComponent(name) {
    document.getElementById('pageContent').append(name)
}

export function datetimeConvert(datetime) {
    const parts = datetime.split(/([\d]{4})([\d]{2})([\d]{2})T([\d]{2})([\d]{2}).+/);

    return `${parts[3]}/${parts[2]}/${parts[1]} ${parts[4]}h${parts[5]}`

}

export function propAccess(obj, path){
    return path.trim().split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null
    }, obj)
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

    let time = ""

    if (hours != 0) {
        time += hours + 'h'
    }

    if (minutes != 0) {
        time += minutes + 'min'
    }

    if (seconds != 0) {
        time += seconds + 's'
    }

    if (hours == 0 && minutes == 0 && seconds == 0) {
        time += seconds + 's'
    }

    return time;
}

String.prototype.interpolate = function (obj) {
    const  regex = /{{(.+)}}/
    const match = regex.exec(this)
    const replacement = propAccess(obj, match[1])
    const string = this.replace(regex, replacement)
    return string
}