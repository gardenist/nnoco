function prettyLine(pretty = false) {
    return pretty ? '\n' : '';
}

function prettyIndent(pretty, indent) {
    return pretty ? '  '.repeat(indent) : '';
}

function toJson(value, pretty = false, indent = 1) {
    let type = typeof value;
    if(type === 'object') {
        if(Object.getPrototypeOf(value) === Array.prototype) {
            return '[' + value.map(function(element) {
                return toJson(element);
            }).join(', ') + ']';
        } else {
            let keys = Object.keys(value);

            return '{' + prettyLine(pretty)
                + keys.map(function(key) {
                        return `${prettyIndent(pretty, indent)}"${key}": ${toJson(value[key], pretty, indent + 1)}`
                    }).join(',' + prettyLine(pretty)) 
                + prettyLine(pretty) + prettyIndent(pretty, indent - 1) + '}';
        }
    } else {
        if(type === 'string' || type === 'function') {
            return `"${value}"`
        }

        return String(value);
    }
}

console.log(toJson({ hello: 'world', foo: "bar", age: 1, meta: { favorites: ['read', 'game'], etc: undefined}}));
console.log(toJson({ hello: 'world', foo: "bar", age: 1, meta: { favorites: ['read', 'game'], etc: undefined}, 'a': 'b'}, true));
console.log(toJson([1,2,3,4, "5"]));