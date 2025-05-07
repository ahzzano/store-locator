export interface Shop {
    id: number
    city: City
    name: string
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

