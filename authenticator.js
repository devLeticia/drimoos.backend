function authenticatior (req, res, next) {
    console.log('Authenticating...');
    next();
}

module.exports = authenticatior;


// unit tests x integration tests -> 
// unit test  - faster but gives less confidence: because it tests one or multiple classes without external dependencies (good for testing logics)
// Integration test - takes longer to execute, but gives more confidence beucase it uses external resources ()
// end to end test - drives an application through its UI -> selenium - greatest amount of confidence, but very slow and brittle
