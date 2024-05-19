enum PaymentStatuses {
    Success = "SUCCESS",
    Pending = "PENDING",
    Cancelled = "CANCELLED",
  }
  export const paymentStatusArray = Object.values(PaymentStatuses);
  export default PaymentStatuses;
  
  export type PaymentStatus =
    | PaymentStatuses.Success
    | PaymentStatuses.Pending
    | PaymentStatuses.Cancelled;
  