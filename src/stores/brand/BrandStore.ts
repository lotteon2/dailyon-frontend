import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Brand, ReadBrandListResponse } from '@/apis/brand/BrandDto'
import { getBrands } from '@/apis/brand/BrandClient'

export const useBrandStore = defineStore(
  'brand',
  () => {
    const brandList = ref<Brand[]>([])

    const setBrands = async () => {
      if (brandList.value.length === 0) {
        const response: ReadBrandListResponse = await getBrands()
        brandList.value = response.brandResponses
      }
    }

    return { brandList, setBrands }
  },
  {
    persist: {
      key: 'brands',
      storage: sessionStorage,
      paths: ['brandList']
    }
  }
)
