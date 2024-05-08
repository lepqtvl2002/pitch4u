import { decimalToTimeString } from "./utils";

export function formatDateToddMMyyyy(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTimeToddMMyyyyHHmm(dateTime: string) {
  return new Date(dateTime).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeFrameToString(timeFrame: number[]) {
  return timeFrame
    .map((time: any) => decimalToTimeString(Number(time)))
    .join(" - ");
}

export function stringToTimeFrame(string: string) {
  return string.split(" - ").map((time: string) => {
    const [hours, minutes] = time.split(":");
    return Number(hours) + Number(minutes) / 60;
  });
}
