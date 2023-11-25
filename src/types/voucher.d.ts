export interface IVoucher {
  voucher_id: number;
  code: string;
  type: string;
  active: boolean;
  expire_date: Date;
  usage_count: number | null;
  discount: number;
  created_from: "super_admin" | "admin" | "user" | "staff";
  created_by: number;
  pitch_id: null | number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
