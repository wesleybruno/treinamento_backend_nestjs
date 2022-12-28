export class RestaurantEntity {

    constructor(private id: string, private externalId: string, private description: string) { }
}

export class RestaurantAddress { 
    constructor(private id: string, private description: string, private number: string) { }
}