function mask(text, start, end, maskCharacter = "*") {
    return text.substring(0, start) +
        maskCharacter.repeat(end - start + 1) +
        text.substring(end + 1);
}

let phoneNumber = "010-1234-5678";

console.log(mask(phoneNumber, 4, 7, "X"));