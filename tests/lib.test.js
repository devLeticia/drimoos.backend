//naming convention for tests archives: nameofdemodule.test.js
//it must be clean and maintainable, otherwise, you'll waste time 
const lib = require('../lib')

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    })
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })
    
    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
})

describe('greet', () =>{
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/); //toContain()
    })
});

describe('getCurrencies', () => {
    it('Should return supported currencies', () => {
        const result = lib.getCurrencies()
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    })
})

describe('getProduct', () => {
    it('Should return the product with the given id', () => {
        const result = lib.getProduct(1)
        expect(result).toEqual({id: 1, price: 10}); //must be all equal object
        expect(result).toMatchObject({id: 1, price: 10}); // only the properties we are interested,  as long as it has these two properties.
        //toHaveProperty('id', 'price')
    })
})

describe('registerUser', () => {
    it('Should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => {lib.registerUser(a)}).toThrow();
        })
    })
})

//jest.fn -> mock function that has no implementation, no code we can program it to return a specific value