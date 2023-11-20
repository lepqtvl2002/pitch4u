import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IUser } from "@/types/user";
import { cva } from "class-variance-authority";

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

export const userStateVariant = cva(
  "text-xs font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        unVerify:
          "bg-yellow-100 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
        online:
          "bg-green-100 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        offline: "bg-muted text-muted-foreground",
        banned: "bg-red-100 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
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
  "text-xs font-medium rounded-full px-2 py-1 text-center cursor-default",
  {
    variants: {
      variant: {
        REDUCE_AMOUNT:
          "bg-green-100 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        REDUCE_PERCENT:
          "bg-red-100 text-red-600 dark:text-red-400 dark:bg-red-600/50",
        default:
          "bg-yellow-100 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// export const userStateVariant = cva(
//   "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
//   {
//     variants: {
//       variant: {
//         unVerify:
//           "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
//         online:
//           "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
//         offline: "bg-muted text-muted-foreground",
//         banned:
//           "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
//       },
//     },
//   }
// );

enum VoucherType {
  REDUCE_AMOUNT = "REDUCE_AMOUNT",
  REDUCE_PERCENT = "REDUCE_PERCENT",
}

export const voucherTypeToString = (type: VoucherType) => {
  switch (type) {
    case VoucherType.REDUCE_AMOUNT:
      return "Giảm giá";
    case VoucherType.REDUCE_PERCENT:
      return "Giảm theo %";
    default:
      return "Giảm theo %";
  }
};

export const stringToVoucherType = (type: string) => {
  switch (type) {
    case "Giảm giá":
      return "REDUCE_AMOUNT";
    case "REDUCE_AMOUNT":
      return "REDUCE_AMOUNT";
    case "Giảm theo %":
      return "REDUCE_PERCENT";
    case "REDUCE_PERCENT":
      return "REDUCE_PERCENT";
    default:
      return "REDUCE_PERCENT";
  }
};

export const voucherStatusToString = (status: string) => {
  switch (status) {
    case "RUNNING":
      return "🕛 Đang chạy";
    case "EXPIRED":
      return "❌ Hết hạn";
    default:
      return "🕛 Đang chạy";
  }
};

export const stringToVoucherStatus = (status: string) => {
  switch (status) {
    case "Đang chạy":
      return "RUNNING";
    case "RUNNING":
      return "RUNNING";
    case "Hết hạn":
      return "EXPIRED";
    case "EXPIRED":
      return "EXPIRED";
    default:
      return "EXPIRED";
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
  return amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  return daysOfWeek[dayOfWeek - 1 || 0];
}