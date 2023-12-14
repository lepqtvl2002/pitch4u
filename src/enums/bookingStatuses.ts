enum BookingStatuses {
  Success = "success",
  Pending = "pending",
  Canceled = "canceled",
}
export const bookingStatusArray = Object.values(BookingStatuses);
export default BookingStatuses;

export type BookingStatus =
  | BookingStatuses.Success
  | BookingStatuses.Pending
  | BookingStatuses.Canceled;
