enum RegistrationStatuses {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export default RegistrationStatuses;

export type RegistrationStatus =
  | RegistrationStatuses.Pending
  | RegistrationStatuses.Approved
  | RegistrationStatuses.Rejected;
