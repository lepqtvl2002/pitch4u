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
import { IPitch } from "@/types/pitch";
import { Button } from "../ui/button";

export function SelectMyPitch({
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
        <SelectValue className="w-fit" placeholder="Tất cả" />
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

export function SelectPitch({
  pitchId,
  setPitchId,
}: {
  pitchId?: number | string;
  setPitchId: any;
}) {
  const [value, setValue] = React.useState("");
  const debouncedSearch = useDebounce(value);
  const { data, isLoading } = PitchUseQuery.getAllPitches({
    name: debouncedSearch,
  });
  return (
    <Select onValueChange={setPitchId}>
      <SelectTrigger>
        <SelectValue className="w-fit" placeholder="Tất cả" />
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

export function SelectMultiplePitches({
  pitches,
  setPitches,
  prevPitchIDs,
}: {
  pitches?: IPitch[];
  setPitches: any;
  prevPitchIDs?: number[];
}) {
  const [value, setValue] = React.useState("");
  const { data, isLoading } = PitchUseQuery.getMyPitches({
    name: value,
  });
  React.useEffect(() => {
    if (prevPitchIDs) {
      setPitches(
        data?.result.data.filter((pitch) =>
          prevPitchIDs.includes(pitch.pitch_id)
        )
      );
    }
  }, [data?.result.data]);

  return (
    <div className="grid gap-2">
      <Input
        placeholder="Tìm sân"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="flex gap-2">
          {data?.result.data.map((pitchItem) => (
            <Button
              variant="outline"
              className="w-fit"
              key={pitchItem.pitch_id}
              disabled={pitches?.includes(pitchItem)}
              onClick={() => {
                setPitches((prev: IPitch[]) => [...prev, pitchItem]);
              }}
            >
              {pitchItem.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
