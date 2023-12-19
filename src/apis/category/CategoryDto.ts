export interface Category {
    id: number
    name: string
}

export interface ReadChildrenCategoryResponse {
    categoryResponses: Array<Category>
}