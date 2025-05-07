export interface Shop {
    city: City
    id: number
}

export interface Item {
    name: string,
    price: number,
    shop: Shop
    id: number
}

export interface City {
    name: string,
    id: number
}

