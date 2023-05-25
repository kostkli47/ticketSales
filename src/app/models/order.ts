export interface IOrder {
    age: string | null,
    birthDay: string | null,
    cardNumber: string,
    tourId: string | null,
    userId: string | null,
    _id?: string 
}

export interface IOrderServ {
    age: string 
    birthDay: string 
    cardNumber: string,
    tourId: string 
    userId: string,
    _id: string
}