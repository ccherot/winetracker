import { Cellar } from './cellar';


export class User {
    email: string 
    firstName: string 
    lastName: string
    birthday: Date
    cellars: Cellar[]
    _id: string

    constructor(firstName = "", lastName = "", birthday = null, email = "", ){
        this.firstName = firstName
        this.lastName = lastName
        this.birthday = birthday
        this.email = email
    }
}
