import type { ReadProductDetailResponse } from '@/apis/product/ProductDto'

export interface ReadAuctionPageResponse {
  totalElements: number
  totalPages: number
  responses: ReadAuctionResponse[]
}

export interface ReadAuctionDetailResponse {
  auctionResponse: ReadAuctionResponse
  productDetailResponse: ReadProductDetailResponse
}

export interface ReadAuctionResponse {
  id: string
  auctionProductId: number
  auctionName: string
  startBidPrice: number
  maximumWinner: number
  startAt: string
  started: boolean
  ended: boolean
}
