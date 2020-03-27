function modelementize(element) {
    // element에 바인딩된 model을 반환
    let value = element.value;

    let model = {
        get value() {
            return value;
        },

        set value(newValue) {
            value = newValue;
            element.value = value;
        }
    }

    element.onchange = (e) => model.value = element.value;
    element.onkeyup = (e) => model.value = element.value;

    return model;
}

function modelement(model, name, element) {
    let value = element.value;

    Object.defineProperty(model, name, {
        get() {
            return value;
        },
        set(newValue) {
            value = newValue;
            element.value = newValue;
        },
        enumerable: true
    });

    element.onchange = () => model[name] = element.value;
    element.onkeyup = () => model[name] = element.value;
}