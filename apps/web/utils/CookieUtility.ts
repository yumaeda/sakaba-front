const getCookie = (name: string): string => {
    const tokens = document.cookie.split(';')
    let value = ''
    for (var i = 0; i < tokens.length; ++i) {
        const token = tokens[i].split('=')
        if (name == token[0].trim()) {
            value = decodeURIComponent(token[1])
            break
        }
    }

    return value
}

const deleteCookie = (name: string, path: string = '/') => {
    // Set the cookie's expiration date to a past date
    document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}

export { deleteCookie, getCookie }
