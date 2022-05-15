export interface SaleData {
  customerId: number | null,
  customerLastName: string,
  customerFirstName: string,
  stuffLastName: string,
  stuffFirstName: string,
  rankName: string,
  menu: string,
  price: number | null,
  salesDate: string
}

export interface SaleSearch {
  customerId: number | null,
  customerName: string,
  stuffName: string,
  rankName: string,
  menu: string,
  priceMin: number | null,
  priceMax: number | null,
  salesDateMin: string,
  salesDateMax: string
}
