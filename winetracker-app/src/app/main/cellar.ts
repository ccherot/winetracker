import { CellarItem } from './cellaritem'

export class Cellar {
    cellarName: string
    cellaritems: CellarItem[]

    constructor(cellarName = "", cellarItems = new Array<CellarItem>())
    {
        this.cellarName = cellarName
        this.cellaritems = cellarItems
    }
}
