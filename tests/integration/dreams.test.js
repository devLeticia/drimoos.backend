const {Dream} = require('../../models/dream');
const mongoose = require('mongoose');

describe('/api/dreams', () => {
    let server;
    let userId;
    let dream;

    beforeEach(async () => {
        server = require('../../index');
        userId = mongoose.Types.ObjectId()
        dream = new Dream({
            userId: userId,
            happenedAt: new Date(),
            editedAt: new Date(),
            title: 'A new title here',
            description: 'A description here',
            feelings: [1, 4, 7],
            intensity: 3,
            keyWords: ['fruits', 'rain', 'elderly'],
            lifeContext: 'gwergweogowiehgowiheg',
            lifeCategories: [1, 2, 3],
            timeReference: 1,
            source: 3,
            intepretation: 'I still dont have an interpretation to it',
            purpose: [1, 2, 3]
        });
        await dream.save()
    });
   afterEach(async () => {
    await server.close();
    await Dream.remove({});
   })
   it('Should work', async () => {
    const result = await Dream.findById(userId);
    expect(result).not.toBeNull();
   })
})


// Teste Driven Development 

//1. you think about all paths and start writing the test cases. 
