export interface Category {
  id: number
  name: string
}

export interface ReadChildrenCategoryResponse {
  categoryResponses: Array<Category>
}

export interface CategoryTree {
  id: number
  categories: Array<Category>
}

export interface ReadBreadCrumbResponse {
  breadCrumbs: Category[]
}
