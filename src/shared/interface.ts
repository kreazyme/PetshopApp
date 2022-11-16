export interface IUser {
    id: String,
    username: String,
    name: String,
    email?: String,
    role: boolean
}

export interface IProductprops {
    item: IProduct
}

export interface ITypeProduct {
    tittle: String,
    amount: Number
}

export interface IProductCart {
    title: String,
    price: number,
    image: any
}
export interface IProductWishList {
    title: String,
    price: number,
    image: any,
    status: boolean,
}

export interface IProduct {
    title: string
    price: string
    images: Images,
    description: string,
    amount: string,
}

export interface Images {
    public_id: string
    url: string
}

export interface Assets {
    url: string
}
