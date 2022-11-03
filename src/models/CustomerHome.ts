import { CustomerHomeReserve } from "./CustomerHomeReserve";
import { CustomerHomeSales } from "./CustomerHomeSales";

export class CustomerHome {
  /** 予約情報 */
  customerHomeReserve: CustomerHomeReserve = new CustomerHomeReserve();
  /** 来店履歴情報 */
  customerHomeSalesList: CustomerHomeSales[] = [];
}
