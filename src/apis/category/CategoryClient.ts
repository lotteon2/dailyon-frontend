import { type AxiosResponse } from "axios";
import { defaultAxiosInstance } from "@/apis/utils";

const PRODUCT_SERVICE_PREFIX: string = "/product-service"
const CATEGORY_PREFIX: string = "/categories"

export const getChildCategories = async(id: number | null): Promise<AxiosResponse> => {
    return await defaultAxiosInstance.get(
        `${PRODUCT_SERVICE_PREFIX}${CATEGORY_PREFIX}/master`,
        {
            params: {id : id}
        }
    )
}

export const getBreadCrumbs = async(categoryId: number): Promise<AxiosResponse> => {
    return await defaultAxiosInstance.get(
        `${PRODUCT_SERVICE_PREFIX}${CATEGORY_PREFIX}/breadcrumb/${categoryId}`
    )
}