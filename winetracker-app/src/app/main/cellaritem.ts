import { Wine } from './wine';
export class CellarItem {

    quantity: number
    price: number
    purchaseDate: Date
    purchaseLocation: string
    wine: string //reference to the MongoDB _id prop of the wine
    storageLocationId: number
    createdAt: Date
    updatedAt: Date
    _id: string

    constructor(quantity = 0, price = 0, purchaseDate = null, purchaseLocation = "", wine = null, storageLocationId = -1 )
    {
        this.quantity = quantity
        this.price = price
        this.purchaseDate = purchaseDate
        this.purchaseLocation = purchaseLocation
        this.wine = wine
        this.storageLocationId = storageLocationId
    }
}
