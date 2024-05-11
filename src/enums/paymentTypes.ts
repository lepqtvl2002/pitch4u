enum PaymentTypes {
  PayLater = "pay_later",
  VNPay = "vnpay",
}
export const paymentTypesArray = Object.values(PaymentTypes);
export default PaymentTypes;

export type PaymentType = PaymentTypes.PayLater | PaymentTypes.VNPay;
