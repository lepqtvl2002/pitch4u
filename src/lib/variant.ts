import PaymentTypes from "@/enums/paymentTypes";
import { cva } from "class-variance-authority";

export const registrationStatusVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        approved:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        pending:
          "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
        denied:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

export const paymentTypeVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        [PaymentTypes.PayOS]:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        [PaymentTypes.PayLater]:
          "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
        [PaymentTypes.VNPay]:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
      },
    },
    defaultVariants: {
      variant: PaymentTypes.PayOS,
    },
  }
);
