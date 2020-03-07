const parseCookies = (cookie = '') => 
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        },{});

function parseCookies2(cookie = '') {
    return cookie // method chaining
        .split(';')
        .map(element => element.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((object, [key, value]) => object[key.trim()] = decodeURIComponent(value), {});
}

function parseCookies2(cookie) {
    if(!cookie) {
        cookie = '';
    }

    // "theme=light; sessionToken=abc123; a=b; c=d"
    cookie = cookie.split(';'); // ["theme=light", " sessionToken=abc123", " a=b"]

    cookie = cookie.map(function(element) {
        // "theme=light"
        return element.split('='); // ["theme", "light"]
    });

    // [["theme", "light"], [" sessionToken", "abc123"], [" a", "b"]]
    cookie = cookie.map(function(element) { // destructure 구조 분해 할당?
        // element = ["theme", "light"]

        // [k, ...vs]
        var k = element[0]; // 첫 번째 요소
        var vs = element.slice(1); // 두 번째 요소~나머지

        return [k, vs.join('=')]; ///
    });

    let cookieObject = cookie.reduce(function(object, array) {
        // ["theme", "light"]
        var key = array[0].trim(); // "theme"
        var value = decodeURIComponent(array[1]); // "light"

        object[key] = value;

        // { "theme": "light", "sessionToken": "abc123", "a": "b"}
    }, {});

    return cookieObject;
}