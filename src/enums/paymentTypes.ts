enum PaymentTypes {
  PayLater = "pay_later",
  VNPay = "vnpay",
  PayOS = "payos",
}
export const paymentTypesArray = Object.values(PaymentTypes);
export default PaymentTypes;

export type PaymentType =
  | PaymentTypes.PayLater
  | PaymentTypes.VNPay
  | PaymentTypes.PayOS;
