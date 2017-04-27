import { Wine } from './wine';
export class CellarItem {

    quantity: number
    price: number
    purchaseDate: Date
    purchaseLocation: string
    wine: Wine
    storageLocationId: number
    createdAt: Date
    updatedAt: Date

    constructor(quantity = 0, price = 0, purchaseDate = null, purchaseLocation = "", wine = null, storageLocationId = -1, )
    {
        this.quantity = quantity
        this.price = price
        this.purchaseDate = purchaseDate
        this.purchaseLocation = purchaseLocation
        this.wine = wine
        this.storageLocationId = storageLocationId
    }
}
