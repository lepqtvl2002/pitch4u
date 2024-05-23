import { pitchTypeToString } from "@/lib/convert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { pitchTypesArray } from "@/enums/pitchTypes";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { cn } from "@/lib/utils";

interface SelectPitchTypeProps {
  pitchType: string;
  setPitchType: (type: string) => void;
  className?: string;
}

export default function SelectPitchType({
  pitchType,
  setPitchType,
  className,
}: SelectPitchTypeProps) {
  const { data: pitchTypes, isLoading: isLoadingPitchTypes } =
    PitchUseQuery.getPitchTypes();

  return (
    <Select onValueChange={setPitchType}>
      <SelectTrigger
        className={cn(
          "w-full min-w-[100px] md:min-w-[200px] rounded-full flex-1",
          className
        )}
      >
        <SelectValue className="truncate">
          {pitchTypeToString(pitchType)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {isLoadingPitchTypes ? (
          <>Loading...</>
        ) : (
          pitchTypesArray.map((type) => (
            <SelectItem
              key={type}
              value={type}
              disabled={
                pitchTypes && !(type.toUpperCase() in pitchTypes?.result)
              }
            >
              {pitchTypeToString(type)}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
}
