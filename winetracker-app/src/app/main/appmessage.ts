export class AppMessage {

    //this is essentially serving as a generic message object
    //but could get fleshed out with other more interesting
    //properties at some point
    name: string
    value: any

    constructor(name = "", value = null)
    {
        this.name = name
        this.value = value
    }
}
