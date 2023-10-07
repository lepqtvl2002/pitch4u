import RegistrationStatuses from "@/enums/registrationStatuses";

export const stringToRegistrationStatus = (status: string) => {
  switch (status) {
    case "Đang chờ":
      return RegistrationStatuses.Pending;
    case "pending":
      return RegistrationStatuses.Pending;
    case "Bị từ chối":
      return RegistrationStatuses.Rejected;
    case "rejected":
      return RegistrationStatuses.Rejected;
    default:
      return RegistrationStatuses.Approved;
  }
};

export const registrationStatusToString = (status: string) => {
  switch (status) {
    case "pending":
      return "Đang chờ";
    case "Đang chờ":
      return "Đang chờ";
    case "rejected":
      return "Bị từ chối";
    case "Bị từ chối":
      return "Bị từ chối";
    default:
      return "Đã duyệt";
  }
};
