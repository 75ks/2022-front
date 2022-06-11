export interface  CustomerCreateData {
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
