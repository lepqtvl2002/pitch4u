import PitchTypes from "@/enums/pitchTypes";
import SoccerPitchTypes from "@/enums/soccerPitchTypes";
import RegistrationStatuses from "@/enums/registrationStatuses";
import ReportTypes from "@/enums/reportTypes";
import NotificationTypes from "@/enums/notificationTypes";

export const stringToRegistrationStatus = (status: string) => {
  switch (status) {
    case "Đang chờ":
      return RegistrationStatuses.Pending;
    case "pending":
      return RegistrationStatuses.Pending;
    case "Bị từ chối":
      return RegistrationStatuses.Rejected;
    case "denied":
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
    case "denied":
      return "Bị từ chối";
    case "Bị từ chối":
      return "Bị từ chối";
    default:
      return "Đã duyệt";
  }
};

export const stringToSoccerPitchType = (type: string) => {
  switch (type) {
    case "Sân 5":
      return SoccerPitchTypes.Pitch5;
    case "PITCH5":
      return SoccerPitchTypes.Pitch5;
    case "Sân 7":
      return SoccerPitchTypes.Pitch7;
    case "PITCH7":
      return SoccerPitchTypes.Pitch7;
    case "Sân 9":
      return SoccerPitchTypes.Pitch9;
    case "PITCH9":
      return SoccerPitchTypes.Pitch9;
    default:
      return SoccerPitchTypes.Pitch11;
  }
};

export const soccerPitchTypeToString = (type: string) => {
  switch (type) {
    case SoccerPitchTypes.Pitch5:
      return "Sân 5";
    case "Sân 5":
      return "Sân 5";
    case SoccerPitchTypes.Pitch7:
      return "Sân 7";
    case "Sân 7":
      return "Sân 7";
    case SoccerPitchTypes.Pitch9:
      return "Sân 9";
    case "Sân 9":
      return "Sân 9";
    default:
      return "Sân 11";
  }
};

export const reportTypeToString = (type: string) => {
  switch (type) {
    case ReportTypes.Pitch:
      return "Sân bóng";
    case "Sân bóng":
      return "Sân bóng";
    default:
      return "Người dùng";
  }
};

export const stringToReportType = (string: string) => {
  switch (string) {
    case "Sân bóng":
      return ReportTypes.Pitch;
    case ReportTypes.Pitch:
      return ReportTypes.Pitch;
    default:
      return ReportTypes.User;
  }
};

export const stringToPitchType = (type: string) => {
  if (type.includes("đá")) {
    return PitchTypes.Soccer;
  }
  if (type.includes("tennis")) {
    return PitchTypes.Tennis;
  }
  if (type.includes("bóng chuyền")) {
    return PitchTypes.Volleyball;
  }
  if (type.includes("rổ")) {
    return PitchTypes.Basketball;
  }
  if (type.includes("cầu lông")) {
    return PitchTypes.Badminton;
  }
  return PitchTypes.Other;
};

export const pitchTypeToString = (type: string | null) => {
  if (!type) return "Tất cả";
  switch (type) {
    case PitchTypes.Soccer:
      return "Sân bóng đá";
    case PitchTypes.Tennis:
      return "Sân tennis";
    case PitchTypes.Volleyball:
      return "Sân bóng chuyền";
    case PitchTypes.Basketball:
      return "Sân bóng rổ";
    case PitchTypes.Badminton:
      return "Sân cầu lông";
    default:
      return "Loại sân chưa xác định";
  }
};

export const subPitchTypeToString = ({
  subPitchType,
  pitchType,
}: {
  subPitchType?: string;
  pitchType: string;
}) => {
  switch (subPitchType) {
    case SoccerPitchTypes.Pitch5:
      return "Sân 5";
    case SoccerPitchTypes.Pitch7:
      return "Sân 7";
    case SoccerPitchTypes.Pitch9:
      return "Sân 9";
    case SoccerPitchTypes.Pitch11:
      return "Sân 11";
    default:
      return pitchTypeToString(pitchType);
  }
};

export function notificationTypeToString(type: string) {
  switch (type) {
    case NotificationTypes.PostLike:
      return "Thích bài viết";
    case NotificationTypes.PostComment:
      return "Bình luận bài viết";
    case NotificationTypes.PostReplyComment:
      return "Trả lời bình luận";
    case NotificationTypes.PostLikeReplyComment:
      return "Thích bình luận";
    case NotificationTypes.BookingCancel:
      return "Hủy đặt lịch";
    case NotificationTypes.BookingPending:
      return "Đặt lịch chờ xác nhận";
    case NotificationTypes.BookingApprove:
      return "Đặt lịch đã được xác nhận";
    case NotificationTypes.Success:
      return "Thành công";
    case NotificationTypes.Canceled:
      return "Đã bị hủy";
    default:
      return "Thông báo";
  }
}
