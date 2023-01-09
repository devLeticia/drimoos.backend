//always a positive number or zero
module.exports.absolute = function(number) {
    return number >= 0 ?  number : -number
}
// tests we need here: as many as executions paths we have here - we have 3 execution paths here 

module.exports.greet = function(name) {
    return 'Welcome ' + name
}

module.exports.getCurrencies = function () {
    return ['USD', 'AUD', 'EUR'];
}

module.exports.getProduct = function(productId) {
    return { id: productId, price: 10};
}

module.exports.registerUser = function(username) {
    if (!username) throw new Error('Username is required.');
    return { id: new Date().getTime(), username: username}
}