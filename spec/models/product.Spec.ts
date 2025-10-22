import { productStore } from '../../src/module/Products';

const store = new productStore();

describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });

    it('should have an update method', () => {
        expect(store.update).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });

    let createdProduct: any;

    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'Burger',
            price: 15.99,
            description: 'Delicious beef burger',
            category: 'FastFood',
        });

        createdProduct = result; // save it for next tests

        expect(result).toEqual({
            id: result.id, // database-generated id
            name: 'Burger',
            price: 15.99,
            description: 'Delicious beef burger',
            category: 'FastFood',
        });
    });

    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0); // at least one product exists
    });

    it('show method should return the correct product', async () => {
        const result = await store.show(Number(createdProduct.id));
        expect(result).toEqual(createdProduct);
    });

    it('update method should modify the product', async () => {
        const result = await store.update({
            id: createdProduct.id,
            name: 'Cheese Burger',
            price: 17.5,
            description: 'Burger with cheese',
            category: 'FastFood',
        });

        expect(result.name).toBe('Cheese Burger');
        expect(result.price).toBe(17.5);
    });

    it('delete method should remove the product', async () => {
        await store.delete(Number(createdProduct.id));
        const result = await store.index();

        // Ensure deleted no longer in DB
        const exists = result.find((p) => p.id === createdProduct.id);
        expect(exists).toBeUndefined();
    });
});
