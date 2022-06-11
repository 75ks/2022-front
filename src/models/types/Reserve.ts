export interface ReserveData {
  reserveHistoryId: string,
  rank: string,
  menu: string,
  price: number | null,
  reserveDatetime: string,
  reserveState: number | null,
  customerLastName: string,
  customerFirstName: number | null,
  customerLastNameKana: string,
  customerFirstNameKana: string,
  stuffLastName: string,
  stuffFirstName: string,
  stuffLastNameKana: string,
  stuffFirstNameKana: string
}

export interface ReserveSearch {
  reserveHistoryId: string,
  customerName: string,
  stuffName: string,
  rank: string,
  menu: string,
  priceMin: number | null,
  priceMax: number | null,
  reserveDateTimeMin: string,
  reserveDateTimeMax: string,
  reserveState: number | null
}
