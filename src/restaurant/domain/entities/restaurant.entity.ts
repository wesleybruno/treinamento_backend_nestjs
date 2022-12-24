export class RestaurantEntity {

    constructor(private id: string, private description: string, private address: RestaurantAddress) { }
}

export class RestaurantAddress { 
    constructor(private id: string, private description: string, private number: string) { }
}