import { BookingStatus } from "@/enums/bookingStatuses";

export type ISubPitch = {
  subpitch_id: string | number;
  pitch_id: string | number;
  name: string;
  price: number;
  type: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  booking?: {
    day: number;
    start_time: string;
    end_time: string;
    subpitch_id: number;
    booking_id: number;
    status: BookingStatus;
  };
  price_by_hour?: {
    time_frame: number[];
    price: number;
  }[];
};
