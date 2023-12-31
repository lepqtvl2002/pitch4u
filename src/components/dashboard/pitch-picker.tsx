import * as React from "react";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import useDebounce from "@/hooks/use-debounce";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function SelectPitch({
  pitchId,
  setPitchId,
}: {
  pitchId?: number | string;
  setPitchId: any;
}) {
  const [value, setValue] = React.useState("");
  const debouncedSearch = useDebounce(value);
  const { data, isLoading } = PitchUseQuery.getMyPitches({
    name: debouncedSearch,
  });
  return (
    <Select onValueChange={setPitchId}>
      <SelectTrigger>
        <SelectValue className="w-fit" placeholder={`Tất cả các sân`} />
      </SelectTrigger>
      <SelectContent>
        <div className="grid gap-0.5">
          <Input
            placeholder="Tìm sân"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <SelectItem value={""}>Tất cả</SelectItem>
          {isLoading ? (
            <>Loading...</>
          ) : (
            data?.result.data.map((pitchItem) => (
              <SelectItem
                key={pitchItem.pitch_id}
                value={pitchItem.pitch_id.toString()}
              >
                {pitchItem.name}
              </SelectItem>
            ))
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
