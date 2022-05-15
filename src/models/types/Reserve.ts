export interface ReserveData {
  customerId: number | null,
  customerLastName: string,
  customerFirstName: string,
  stuffLastName: string,
  stuffFirstName: string,
  rankName: string,
  menu: string,
  price: number | null,
  reserveDate: string
}

export interface ReserveSearch {
  customerId: number | null,
  customerName: string,
  stuffName: string,
  rankName: string,
  menu: string,
  priceMin: number | null,
  priceMax: number | null,
  reserveDateMin: string,
  reserveDateMax: string
}
