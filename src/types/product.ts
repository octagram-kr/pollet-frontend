export interface ProductItem {
  id: string
  name: string
  image: string
  pricePoint: number // 기본 포인트
  discountPoint?: number // 할인 포인트(선택)
}
