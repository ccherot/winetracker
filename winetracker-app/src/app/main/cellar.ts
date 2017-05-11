import { CellarItem } from './cellaritem'

export class Cellar {
    cellarName: string
    cellarItems: CellarItem[]
    _id: string
    constructor(cellarName = "", cellarItems = new Array<CellarItem>())
    {
        this.cellarName = cellarName
        this.cellarItems = cellarItems
    }
}
