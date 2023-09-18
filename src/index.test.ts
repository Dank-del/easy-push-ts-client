// BEGIN: 5f5d7f7d6b9a
import EasyPushClient from './index';

describe('EasyPushClient', () => {
    const endpoint = 'http://localhost:4453';
    const username = 'meow';
    const password = 'uwu';

    let client: EasyPushClient;

    beforeEach(() => {
        client = new EasyPushClient(endpoint, username, password);
    });

    describe('createApp', () => {
        it('should create a new app', async () => {
            const name = 'Test App';
            const app = await client.createApp(name);
            expect(app).toBeDefined();
        });
    });

    describe('getApp', () => {
        it('should retrieve an existing app', async () => {
            const name = 'Test App';
            const createdApp = await client.createApp(name);
            const retrievedApp = await client.getApp(createdApp.id);
            expect(retrievedApp.id).toBe(createdApp.id);
            expect(retrievedApp.name).toBe(createdApp.name);
        });
    });

    // describe('updateApp', () => {
    //     it('should update an existing app', async () => {
    //         const name = 'Test App';
    //         const newName = 'New Test App';
    //         const createdApp = await client.createApp(name);
    //         const seconds = 4; //Delay or wait 30 seconds
    //         await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    //         const updatedApp = await client.updateApp(createdApp.id, newName);
    //         expect(updatedApp.id).toBe(createdApp.id);
    //         expect(updatedApp.name).toBe(newName);
    //     });
    // });
});
// END: 5f5d7f7d6b9a