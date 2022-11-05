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

export interface IProduct {
    name: string
    price: string
    assets: Assets
}

export interface Assets {
    url: string
}
