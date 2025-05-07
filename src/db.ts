// db.js
import Dexie, { type EntityTable } from 'dexie';
import { type City, type Shop, type Item } from './types'

export const db = new Dexie('Shops') as Dexie & {
    cities: EntityTable<City, 'id'>,
    shops: EntityTable<Shop, 'id'>
    items: EntityTable<Item, 'id'>

};

db.version(1).stores({
    cities: '++id, name',
    shops: '++id, cityId, name',
    items: '++id, name, price, shopId',
});

