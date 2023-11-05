import PitchTypes from "@/enums/pitchTypes";
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

export const stringToPitchType = (type: string) => {
  switch (type) {
    case "Sân 5":
      return PitchTypes.Pitch5;
    case "PITCH5":
      return PitchTypes.Pitch5;
    case "Sân 7":
      return PitchTypes.Pitch7;
    case "PITCH7":
      return PitchTypes.Pitch7;
    case "Sân 9":
      return PitchTypes.Pitch9;
    case "PITCH9":
      return PitchTypes.Pitch9;
    default:
      return PitchTypes.Pitch11;
  }
};

export const pitchTypeToString = (type: string) => {
  switch (type) {
    case PitchTypes.Pitch5:
      return "Sân 5";
    case "Sân 5":
      return "Sân 5";
    case PitchTypes.Pitch7:
      return "Sân 7";
    case "Sân 7":
      return "Sân 7";
    case PitchTypes.Pitch9:
      return "Sân 9";
    case "Sân 9":
      return "Sân 9";
    default:
      return "Sân 11";
  }
};
