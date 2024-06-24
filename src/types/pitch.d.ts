import { Booking } from "@/server/queries/statistic-queries";
import { ISubPitch } from "./subPitch";
import { ReviewType } from "@/components/landing/review";
import { ILike } from "./like";
import { PitchType } from "@/enums/pitchTypes";

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
  active: boolean;
  images: string[];
  type: PitchType;
  config?: {
    pitch_config_id: number | string;
    pitch_id: number | string;
    open_at: number;
    close_at: number;
    time_frames: number[][];
    open_days: string[];
    active: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
  };
  sub_pitches?: ISubPitch[];
  reviews: ReviewType[];
  likes?: ILike[];
  services: string[];
}

export type BookingPitch = {
  date: Date;
  time_frames: ITimeFrame[];
};

export interface ITimeFrame {
  frame: number[];
  busy: ISubPitch[] & Booking;
  free: ISubPitch[];
}
