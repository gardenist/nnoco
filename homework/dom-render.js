function tag(name, attributes, ...children) {
    let element = document.createElement(name);
    Object.keys(attributes)
        .map(name => {
            let attribute = document.createAttribute(name);
            attribute.value = attributes[name];
            return attribute;
        }).forEach(attr => element.attributes.setNamedItem(attr));
    
    children.forEach(child => {
        if(typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.appendChild(child)
    });
    return element;
}

const ul = (attributes, ...children) => tag('ul', attributes, ...children);
const li = (attributes, ...children) => tag('li', attributes, ...children);
const button = (attributes, ...children) => tag('button', attributes, ...children);