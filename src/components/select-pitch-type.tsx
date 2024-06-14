import { pitchTypeToIcon, pitchTypeToString } from "@/lib/convert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PitchType, pitchTypesArray } from "@/enums/pitchTypes";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { pitchTypeVariant } from "@/lib/variant";

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

  const Icon = Icons[pitchTypeToIcon(pitchType)];

  return (
    <Select onValueChange={setPitchType}>
      <SelectTrigger
        className={cn(
          "w-full min-w-[100px] md:min-w-[200px] rounded-full flex-1",
          pitchTypeVariant({ variant: pitchType as PitchType }),
          className
        )}
      >
        <Icon className="w-8 h-8" />
        <SelectValue className="truncate">
          {pitchTypeToString(pitchType)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {isLoadingPitchTypes ? (
          <>Loading...</>
        ) : (
          pitchTypesArray.map((type) => {
            const Icon = Icons[pitchTypeToIcon(type)];
            return (
              <SelectItem
                key={type}
                value={type}
                disabled={
                  pitchTypes && !(type.toUpperCase() in pitchTypes?.result)
                }
                className="flex w-full items-center"
              >
                <span
                  className={cn("flex", pitchTypeVariant({ variant: type }))}
                >
                  <Icon className="w-4 h-4 mr-2" /> {pitchTypeToString(type)}
                </span>
              </SelectItem>
            );
          })
        )}
      </SelectContent>
    </Select>
  );
}
