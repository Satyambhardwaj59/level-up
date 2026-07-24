export function sum(...numbers) {

    return numbers.reduce((total, current) => {
        return total + current;
    }, 0);

}

export function greet(name) {

    return `Welcome ${name}!`;

}