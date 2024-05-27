import { UserRole } from "@/enums/roles";
import { VoucherType } from "@/enums/voucherTypes";

export interface IVoucher {
  voucher_id: number;
  code: string;
  type: VoucherType;
  active: boolean;
  expire_date: Date;
  usage_count: number | null;
  min_price: number | null;
  max_discount: number | null;
  public: boolean | null;
  discount: number;
  created_from: UserRole;
  created_by: number;
  pitch_id: null | number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
