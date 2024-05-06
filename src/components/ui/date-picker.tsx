import * as React from "react";
import { endOfMonth, format, subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateFormatter } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "./label";

const formatCaption: DateFormatter = (date, options) => {
  const monthVietnamese = `Tháng ${date.getMonth() + 1}`;
  return (
    <>
      {monthVietnamese} {format(date, "yyyy", { locale: options?.locale })}
    </>
  );
};

export function DatePickerBookingPitch({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<any>>;
}) {
  const maxDate = endOfMonth(new Date());
  const yesterday = subDays(new Date(), 1);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < yesterday || date > maxDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export function BirthdayPicker({
  date,
  setDate,
}: {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [month, setMonth] = React.useState(date.getMonth());
  const [year, setYear] = React.useState(date.getFullYear());

  React.useEffect(() => {
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  }, [date]);

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex gap-2 w-fit items-center">
        <Label>Năm</Label>
        <Select
          onValueChange={(value) => {
            const newYear = parseInt(value);
            setYear(newYear);
            setDate(new Date(`${month + 1}-${date.getDate()}-${newYear}`));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={year} />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-96 overflow-auto">
            {new Array(100).fill(0).map((_, index) => {
              const yearItem = (new Date().getFullYear() - index).toString();
              return (
                <SelectItem key={index} value={yearItem}>
                  {yearItem}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 w-fit items-center">
        <Label>Tháng</Label>
        <Select
          onValueChange={(value) => {
            const newMonth = parseInt(value);
            setMonth(newMonth);
            setDate(new Date(`${newMonth + 1}-${date.getDate()}-${year}`));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={month + 1} />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-96 overflow-auto">
            {new Array(12).fill(0).map((_, index) => {
              const monthItem = index.toString();
              return (
                <SelectItem key={index} value={monthItem}>
                  {`${Number(monthItem) + 1}`}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2 w-fit items-center">
        <Label>Ngày</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "dd") : <span>Chọn ngày</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              formatters={{ formatCaption }}
              mode="single"
              defaultMonth={date}
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
