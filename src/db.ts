// db.js
import Dexie, { type EntityTable } from 'dexie';
import { City, Shop, Item } from '@/types';

export const db = new Dexie('Shops') as Dexie & {
    cities: EntityTable<City>,
    shops: EntityTable<Shop>
    items: EntityTable<Item>

};

db.version(1).stores({
    cities: '++id, name',
    shops: '++id, cityId',
    items: '++id, name, price, shopId',
});

