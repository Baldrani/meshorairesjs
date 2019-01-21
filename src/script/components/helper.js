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