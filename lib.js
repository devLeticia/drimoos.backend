//always a positive number or zero
export function absolute(number) {
    return number >= 0 ?  number : -number
}
// tests we need here: as many as executions paths we have here - we have 3 execution paths here 

export function greet(name) {
    return 'Welcome ' + name
}

export function getCurrencies () {
    return ['USD', 'AUD', 'EUR'];
}

export function getProduct(productId) {
    return { id: productId, price: 10};
}

export function registerUser(username) {
    if (!username) throw new Error('Username is required.');
    return { id: new Date().getTime(), username: username}
}