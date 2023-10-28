import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
export function DatePickerCustom({
    date,
    setDate,
}: {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"ghost"} className={cn("justify-center text-xl font-bold text-left bg-white")}>
                    {!date ? "Chọn ngày" : format(date, "dd/MM/yyyy")}
                    <CalendarIcon className="ml-2 h-6 w-6" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day: Date | undefined) =>
                        day ? setDate(day) : setDate(new Date())
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}