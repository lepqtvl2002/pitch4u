import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IUser } from "@/types/user";
import { cva } from "class-variance-authority";
import BookingStatuses from "@/enums/bookingStatuses";
import VoucherStatuses from "@/enums/voucherStatues";
import VoucherTypes, { VoucherType } from "@/enums/voucherTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function backendUrl(path: string) {
  if (path.startsWith("/")) {
    path = path.slice(1);
  }
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
}

export const transactionVariant = cva(
  "text-xs font-medium rounded-full px-2 py-1 text-center cursor-default min-w-[5rem]",
  {
    variants: {
      variant: {
        DEPOSIT:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        WITHDRAW:
          "bg-red-100 text-red-600 dark:text-red-400 dark:bg-red-600/50",
        TRANSFER:
          "bg-blue-100 text-blue-600 dark:text-blue-400 dark:bg-blue-600/50",
        RECEIVE:
          "bg-indigo-100 text-indigo-600 dark:text-indigo-400 dark:bg-indigo-600/50",
        FEE: "bg-gray-100 text-gray-600 dark:text-gray-400 dark:bg-gray-600/50",
        default:
          "bg-yellow-100 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BeautifyUsernameProps = {
  firstName?: string | null;
  lastName?: string | null;
  fullname?: string | null;
};
export const beautifyUsername = (user: BeautifyUsernameProps) => {
  if (user?.fullname) return user.fullname.trim();
  return `${user.firstName || ""} ${user.lastName || ""}`.trim();
};

enum TransactionType {
  DEPOSIT = "DEPOSIT",
  WITHDRAW = "WITHDRAW",
  TRANSFER = "TRANSFER",
  RECEIVE = "RECEIVE",
  FEE = "FEE",
}
export const transactionTypeToString = (type: TransactionType) => {
  switch (type) {
    case TransactionType.DEPOSIT:
      return "Nạp tiền";
    case TransactionType.WITHDRAW:
      return "Rút tiền";
    case TransactionType.TRANSFER:
      return "Chuyển tiền";
    case TransactionType.RECEIVE:
      return "Nhận tiền";
    case TransactionType.FEE:
      return "Phí dịch vụ";
    default:
      return "Phí dịch vụ";
  }
};

export const stringToTransactionType = (type: string) => {
  switch (type) {
    case "Nạp tiền":
      return "DEPOSIT";
    case "DEPOSIT":
      return "DEPOSIT";
    case "Rút tiền":
      return "WITHDRAW";
    case "WITHDRAW":
      return "WITHDRAW";
    case "Chuyển tiền":
      return "TRANSFER";
    case "TRANSFER":
      return "TRANSFER";
    case "Nhận tiền":
      return "RECEIVE";
    case "RECEIVE":
      return "RECEIVE";
    default:
      return "FEE";
  }
};

export const transactionStatusToString = (status: string) => {
  switch (status) {
    case "PENDING":
      return "🕛 Đang chờ";
    case "SUCCESS":
      return "✅ Hoàn thành";
    case "CANCELLED":
      return "❌ Đã hủy";
    default:
      return "🕛 Đang chờ";
  }
};

export const stringToTransactionStatus = (status: string) => {
  switch (status) {
    case "Đang chờ":
      return "PENDING";
    case "PENDING":
      return "PENDING";
    case "Hoàn thành":
      return "SUCCESS";
    case "SUCCESS":
      return "SUCCESS";
    case "Đã hủy":
      return "CANCELLED";
    case "CANCELLED":
      return "CANCELLED";
    default:
      return "PENDING";
  }
};

export const methodToType = (method: string) => {
  switch (method) {
    case "GET":
      return "read";
    case "POST":
      return "create";
    case "PUT":
      return "update";
    case "PATCH":
      return "update";
    case "DELETE":
      return "delete";
    default:
      return "read";
  }
};

export const voucherVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        fixed:
          "bg-green-100 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        percent:
          "bg-yellow-100 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
        default:
          "bg-yellow-100 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const userRoleVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        admin:
          "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
        user: "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        staff: "bg-muted text-muted-foreground",
        super_admin:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
    },
    defaultVariants: {
      variant: "user",
    },
  }
);

export const userStateVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        active:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        suspended:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
    },
  }
);

export const bookingStateVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        success:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        pending:
          "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
        canceled:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
      defaultVariants: {
        variant: "canceled",
      },
    },
  }
);

export const activeVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        true: "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        false:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
    },
  }
);

export const reportTypeVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        pitch:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        user: "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
      },
    },
  }
);

export const pitchTypeVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        PITCH5:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        PITCH7:
          "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
        PITCH9: "bg-muted text-muted-foreground",
        PITCH11:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
    },
    defaultVariants: {
      variant: "PITCH5",
    },
  }
);

export const voucherTypeToString = (type: VoucherType) => {
  switch (type) {
    case VoucherTypes.Fixed:
      return "Giảm giá";
    default:
      return "Giảm theo %";
  }
};

export const stringToVoucherType = (type: string) => {
  switch (type) {
    case "Giảm giá":
      return VoucherTypes.Fixed;
    case "fixed":
      return VoucherTypes.Fixed;
    default:
      return VoucherTypes.Percent;
  }
};

export const voucherStatusToString = (status: string) => {
  switch (status) {
    case VoucherStatuses.Running:
      return "Đang chạy";
    case VoucherStatuses.Stopped:
      return "Đã dừng";
    default:
      return "Hết hạn";
  }
};

export const bookingStatusToString = (status: string) => {
  switch (status) {
    case "success":
      return "Thành công";
    case "pending":
      return "Đang xử lý";
    default:
      return "Đã hủy";
  }
};

export const stringToBookingStatus = (string: string) => {
  switch (string) {
    case "success":
      return BookingStatuses.Success;
    case "Thành công":
      return BookingStatuses.Success;
    case "pending":
      return BookingStatuses.Pending;
    case "Đang xử lý":
      return BookingStatuses.Pending;
    default:
      return BookingStatuses.Canceled;
  }
};

export const stringToVoucherStatus = (status: string) => {
  switch (status) {
    case "Đang chạy":
      return VoucherStatuses.Running;
    case "Đã dừng":
      return VoucherStatuses.Stopped;
    default:
      return VoucherStatuses.Expired;
  }
};

export const stringToVoucherActivity = (string: string) => {
  switch (string) {
    case "Đang chạy":
      return true;
    case "true":
      return true;
    case "running":
      return true;
    default:
      return true;
  }
};

export const voucherActivityToString = (active: boolean) => {
  switch (active) {
    case true:
      return "Đang chạy";
    default:
      return "Đã dừng";
  }
};

export const roleSlugToString = (role: string) => {
  switch (role) {
    case "super_admin":
      return "Quản trị viên";
    case "user":
      return "Người dùng";
    case "staff":
      return "Nhân viên";
    case "admin":
      return "Chủ sân";
    default:
      return "Người dùng";
  }
};

export const stringToRoleSlug = (type: string) => {
  switch (type) {
    case "Quản trị viên":
      return "super_admin";
    case "super_admin":
      return "super_admin";
    case "Người dùng":
      return "user";
    case "user":
      return "user";
    case "Nhân viên":
      return "staff";
    case "staff":
      return "staff";
    case "Chủ sân":
      return "admin";
    case "admin":
      return "admin";
    default:
      return "user";
  }
};

enum ENUM_ROLE_SLUG {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  STAFF = "staff",
  USER = "user",
}
export const isAppManager = (user: IUser) => {
  return user.role.name === ENUM_ROLE_SLUG.SUPER_ADMIN;
};

export const isPitchManager = (user: IUser) => {
  return user.role.name === ENUM_ROLE_SLUG.ADMIN;
};

export const isPitchStaff = (user: IUser) => {
  return user.role.name === ENUM_ROLE_SLUG.STAFF;
};

export const isAppUser = (user: IUser) => {
  return user.role.name === ENUM_ROLE_SLUG.USER;
};

export const comparePercent = (revenueA?: number, revenueB?: number) => {
  if (!revenueA) return "-100";
  if (!revenueB) return "+100";
  if (revenueA === revenueB) {
    return 0;
  }
  if (revenueA > revenueB) {
    return `+${(((revenueA - revenueB) / revenueB) * 100).toFixed(2)}`;
  }
  if (revenueA < revenueB) {
    return `-${(((revenueB - revenueA) / revenueB) * 100).toFixed(2)}`;
  }
};
export const compareAmount = (revenueA?: number, revenueB?: number) => {
  if (!revenueA) return "-100%";
  if (!revenueB) return "+100%";
  if (revenueA === revenueB) {
    return "Giữ nguyên";
  }
  if (revenueA > revenueB) {
    return `+${revenueA - revenueB}`;
  }
  if (revenueA < revenueB) {
    return `-${revenueB - revenueA}`;
  }
};

export const formatMoney = (amount: number) => {
  if (amount >= 1e9) {
    return (
      (amount / 1e9).toLocaleString(undefined, { maximumFractionDigits: 0 }) +
      "B"
    );
  } else if (amount >= 1e6) {
    return (
      (amount / 1e6).toLocaleString(undefined, { maximumFractionDigits: 0 }) +
      "M"
    );
  } else if (amount >= 1e3) {
    return (
      (amount / 1e3).toLocaleString(undefined, { maximumFractionDigits: 0 }) +
      "k"
    );
  } else {
    return amount.toString();
  }
};

export const paymentTypeToString = (paymentType: string) => {
  switch (paymentType) {
    case "vnpay":
      return "Ví VnPay";
    default:
      return "Trả sau";
  }
};

export function convertTimeStringToDecimal(timeString: string): number {
  const [hoursString, minutesString] = timeString.split(":");
  const hours = parseFloat(hoursString);
  const minutes = parseFloat(minutesString) / 60;
  let decimalTime = hours;
  if (minutes) decimalTime += minutes;
  return decimalTime;
}

export function decimalToTimeString(decimalTime: number): string {
  const hours: number = Math.floor(decimalTime);
  const minutes: number = Math.floor((decimalTime - hours) * 60);
  const timeString: string = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return timeString;
}

export function createRangeArray(start: number, end: number): number[] {
  if (Number.isNaN(start) || Number.isNaN(end) || start > end) return [];
  const n = Math.round(end - start); // Calculate the number of items in the array
  const rangeArray: number[] = new Array(n);

  for (let i = 0; i < n; i++) {
    rangeArray[i] = start + i;
  }

  return rangeArray;
}

export function convertDayOfWeek(dayOfWeek: number): string {
  const daysOfWeek = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  return daysOfWeek[dayOfWeek - 1 || 0];
}

export function numberToWords(num: number) {
  const ones = [
    "",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const teens = [
    "mười",
    "mười một",
    "mười hai",
    "mười ba",
    "mười bốn",
    "mười lăm",
    "mười sáu",
    "mười bảy",
    "mười tám",
    "mười chín",
  ];
  const tens = [
    "",
    "",
    "hai mươi",
    "ba mươi",
    "bốn mươi",
    "năm mươi",
    "sáu mươi",
    "bảy mươi",
    "tám mươi",
    "chín mươi",
  ];
  const hundreds = [
    "",
    "một trăm",
    "hai trăm",
    "ba trăm",
    "bốn trăm",
    "năm trăm",
    "sáu trăm",
    "bảy trăm",
    "tám trăm",
    "chín trăm",
  ];
  const scales = ["", "nghìn", "triệu", "tỷ"];

  if (num === 0) {
    return "Không đồng";
  }

  if (num < 0) {
    return "Số tiền âm";
  }

  let words = "";

  for (let i = 0; num > 0; i++) {
    if (num % 1000 !== 0) {
      let chunk = "";
      if (num >= 100) {
        chunk = hundreds[Math.round(num / 100)];
      }
      if (num % 100 < 10) {
        chunk += " " + ones[num % 100];
      } else if (num % 100 < 20) {
        chunk += " " + teens[num % 10];
      } else {
        chunk +=
          " " + tens[Math.floor((num % 100) / 10)] + " " + ones[num % 10];
      }
      if (i > 0) {
        chunk += " " + scales[i];
      }
      words = chunk + " " + words;
    }
    num = Math.floor(num / 1000);
  }

  return words.trim() + " đồng";
}

export function isValidUrl(url: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
}
