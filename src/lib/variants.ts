import PaymentTypes from "@/enums/paymentTypes";
import PitchTypes from "@/enums/pitchTypes";
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

export const pitchTypeVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        [PitchTypes.Soccer]:
          "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        [PitchTypes.Tennis]:
          "bg-emerald-300/50 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-600/50",
        [PitchTypes.Volleyball]:
          "bg-blue-300/50 text-blue-600 dark:text-blue-400 dark:bg-blue-600/50",
        [PitchTypes.Badminton]:
          "bg-teal-300/50 text-teal-600 dark:text-teal-400 dark:bg-teal-600/50",
        [PitchTypes.Basketball]:
          "bg-red-300/50 text-red-600 dark:text-red-400 dark:bg-red-600/50",
        [PitchTypes.All]:
          "bg-yellow-200/50 text-yellow-400 dark:text-yellow-400 dark:bg-yellow-600/50",
        [PitchTypes.Other]:
          "bg-gray-300/50 text-gray-600 dark:text-gray-400 dark:bg-gray-600/50",
      },
    },
    defaultVariants: {
      variant: PitchTypes.All,
    },
  }
);

export const pitchActiveVariant = cva(
  "text-sm font-medium rounded-full px-2 py-1 text-center h-fit w-fit",
  {
    variants: {
      variant: {
        true: "bg-green-300/50 text-green-600 dark:text-green-400 dark:bg-green-600/50",
        false:
          "bg-yellow-300/50 text-yellow-600 dark:text-yellow-400 dark:bg-yellow-600/50",
      },
    },
  }
);
