enum VoucherTypes {
  Fixed = "fixed",
  Percent = "percent",
}
export const voucherTypeArray = Object.values(VoucherTypes);
export default VoucherTypes;

export type VoucherType = VoucherTypes.Fixed | VoucherTypes.Percent;
