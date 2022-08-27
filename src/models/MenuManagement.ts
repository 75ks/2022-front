import { MenuManagementDetail } from "./MenuManagementDetail";

export class MenuManagement {
  /** メニューID */
  menuId: number | null = null;
  /** 詳細 */
  detail: MenuManagementDetail[] = [];
}
