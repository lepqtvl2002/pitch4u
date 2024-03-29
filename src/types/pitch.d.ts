import { Booking } from "@/server/queries/statistic-queries";
import { ISubPitch } from "./subPitch";

export interface IPitch {
  pitch_id: number;
  name: string;
  slug: string;
  address: string;
  logo: null | string;
  suspended: boolean;
  long: null | number;
  lat: null | number;
  createdAt: string;
  is_suspended?: boolean | null;
  suspended?: boolean | null;
  updatedAt: string;
  deletedAt: null | string;
  max_price: number;
  min_price: number;
  rate: string;
  config?: {
    pitch_config_id: number | string;
    pitch_id: number | string;
    open_at: number;
    close_at: number;
    time_frames: number[number[]];
    open_days: string[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  };
  sub_pitches?: ISubPitch[];
}

export type BookingPitch = {
  day: number;
  time_frames: timeFrame[];
};

type TimeFrame = {
  frame: number[][];
  busy: ISubPitch[] & Booking;
  free: ISubPitch[];
};
