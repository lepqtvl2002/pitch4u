enum VoucherStatuses {
  Running = "running",
  Expired = "expired",
  Stopped = "stopped",
}
export const voucherStatusArray = Object.values(VoucherStatuses);
export default VoucherStatuses;

export type VoucherStatus =
  | VoucherStatuses.Running
  | VoucherStatuses.Expired
  | VoucherStatuses.Stopped;
