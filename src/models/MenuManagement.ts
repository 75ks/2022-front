import { MenuManagementDetail } from "./MenuManagementDetail";

export class MenuManagement {
  /** メニューID */
  menuId: number | null = null;
    // /** ランクID */
    // rankId: number | null = null;
    // /** 料金 */
    // price: number | null = null;
  /** 詳細 */
  detail: MenuManagementDetail[] = [];
}
