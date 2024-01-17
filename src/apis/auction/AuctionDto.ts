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
  askingPrice: number
  maximumWinner: number
  startAt: string
  started: boolean
  ended: boolean
}

export interface CreateBidRequest {
  auctionId: string
  round: string
  bidAmount: number
  nickname: string
}

export interface EnterResponse {
  token: string
  readAuctionDetailResponse: ReadAuctionDetailResponse

export interface ReadAuctionHistoryPageResponse {
  totalElements: number
  totalPages: number
  responses: ReadAuctionHistoryResponse[]
}

export interface ReadAuctionHistoryResponse {
  id: string
  memberId: string
  auctionId: string
  auctionName: string
  auctionProductId: number
  auctionProductImg: string
  auctionProductName: string
  auctionProductSizeId: number
  auctionProductSizeName: string
  winner: boolean
  paid: boolean
  amountToPay: number
  memberHighestBid: number
  auctionWinnerBid: number
  createdAt: string

}
