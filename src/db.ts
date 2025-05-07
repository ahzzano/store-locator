// db.js
import Dexie, { type EntityTable } from 'dexie';
import { type City, type Shop, type Item, type Book } from './types'

export const db = new Dexie('Shops') as Dexie & {
    cities: EntityTable<City, 'id'>,
    shops: EntityTable<Shop, 'id'>
    items: EntityTable<Item, 'id'>
    books: EntityTable<Book, 'id'>
};

db.version(1).stores({
    cities: '++id, name',
    shops: '++id, cityId, name',
    items: '++id, name, shopId, price, category',
    books: '++id, name, author'
});

