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
    _id: string
    category: string
    checked: boolean
    description: string
    feedbacks: Feedback[]
    images: Images
    sold: number
    title: string
    types: Type[]
}

export interface Feedback {
    _id: string
    content: string
    rating: number
    product_id: string
    user_id: string
    createdAt: string
    updatedAt: string
    image_url?: string
}

export interface Type {
    _id: string
    name: string
    price: number
    amount: number
    createdAt: string
    updatedAt: string
}

export interface Images {
    public_id: string
    url: string
}

export interface Assets {
    url: string
}
