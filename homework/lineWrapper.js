function wrap(text, start, end) {
    return text.split('\n')
        .map(line => start + line + end)
        .join('\n');
}

let text = "Hello\nWorld!";

let wrapped = wrap(text, "{", "}");

console.log(wrapped);