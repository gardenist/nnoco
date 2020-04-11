// person.name setter/getter

// 클로져를 활용해서 private <-
// javascript private property
function person(name) {
    return {
        get name() {
            console.log('Getter 호출');
            return name;
        },
        set name(newName) {
            console.log('Setter 호출');
            name = newName;
        }
    }
}

let p = person('Junyoung');
console.log(p.name);
p.name = 'nnoco';
console.log(p.name);
