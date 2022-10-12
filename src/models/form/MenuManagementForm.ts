import { MenuManagementDetailForm } from "./MenuManagementDetailForm";

export class MenuManagementForm {
  /** メニューID */
  menuId: number | null = null;
  // /** ランクID */
  // rankId: number | null = null;
  // /** 料金 */
  // price: number | null = null;

  /** 詳細 */
  detail: MenuManagementDetailForm[] = [];

}
