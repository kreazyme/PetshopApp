export interface IUser {
    id: String,
    username: String,
    name: String,
    email?: String,
    role: boolean
}

export interface IProduct {
    id: String,
    title: String,
    type: ITypeProduct,
    description: String,
    category?: String[]
}

export interface ITypeProduct {
    tittle: String,
    amount: Number
}