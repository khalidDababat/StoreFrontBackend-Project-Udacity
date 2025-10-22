import { userStore } from '../../src/module/Users';

const store = new userStore();

describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
    });

    let createdUser: any;

    it('create method should add a user', async () => {
        const result = await store.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'test123',
        });

        createdUser = result; // save for later

        expect(result).toEqual(
            jasmine.objectContaining({
                id: result.id,
                firstname: 'John',
                lastname: 'Doe',
                // password is hashed -> do NOT compare directly
            })
        );
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return the correct user', async () => {
        const result = await store.show(Number(createdUser.id));
        expect(result).toEqual(
            jasmine.objectContaining({
                id: createdUser.id,
                firstname: 'John',
                lastname: 'Doe',
            })
        );
    });

    it('authenticate method should return the user if password is correct', async () => {
        const result = await store.authenticate('John', 'test123');
        expect(result).not.toBeNull();
    });

    it('authenticate should return null for wrong password', async () => {
        const result = await store.authenticate('John', 'wrongpass');
        expect(result).toBeNull();
    });
});
