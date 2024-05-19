"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import { IPitch } from "@/types/pitch";
import Link from "next/link";
import { CircleDollarSign, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Stars } from "../ui/vote-stars";
import { Skeleton } from "../ui/skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import { $globalFetch } from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { pitchTypeToString } from "@/lib/convert";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { pitchTypesArray } from "@/enums/pitchTypes";
import { errorToast } from "@/lib/quick-toast";
import { AxiosError } from "axios";
import { Input } from "../ui/input";

const LIMIT = 3;

const Conditions = [
  { title: "Gần bạn", value: "near" },
  { title: "Chất lượng", value: "quality" },
  { title: "Giá cả", value: "price" },
];

/**
 * SearchBar component.
 *
 * @returns JSX element representing the search bar.
 */
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery);
  const [conditions, setConditions] = useState<string[]>([]);
  const [location, setLocation] = useState<{ long?: number; lat?: number }>({
    long: undefined,
    lat: undefined,
  });
  const [sort, setSort] = React.useState<{
    sortBy: string;
    direction: "asc" | "desc";
  }>({
    sortBy: "createdAt",
    direction: "desc",
  });
  const [rate, setRate] = useState(0);

  const fetchPitches = async ({ pageParam = 1 }) => {
    const params = new URLSearchParams({
      limit: LIMIT,
      page: pageParam,
      long: location.long,
      lat: location.lat,
      name: searchQuery,
      rate_gte: rate,
    } as unknown as string[][]);
    const res = await $globalFetch(`/v1/pitches?${params}`);
    return res.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: ["pitches"],
    queryFn: fetchPitches,
    getNextPageParam: (lastPage, pages) => {
      if (pages?.length > (lastPage?.result.total - 1) / LIMIT + 1)
        return false;
      return Number(lastPage?.result?.page + 1);
    },
  });

  const { data: pitchTypes, isLoading: isLoadingPitchTypes } =
    PitchUseQuery.getPitchTypes();

  const [pitchType, setPitchType] = React.useState<string>("");

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleConditionChange = (condition: string) => {
    const newConditions = conditions.includes(condition)
      ? conditions.filter((c) => c !== condition)
      : [...conditions, condition];

    if (newConditions?.includes("near")) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } else {
      setLocation({
        lat: undefined,
        long: undefined,
      });
    }
    if (newConditions.includes("quality")) {
      setRate(4);
    } else {
      setRate(0);
    }
    if (newConditions.includes("price")) {
      setSort({ sortBy: "price", direction: "asc" });
    } else {
      setSort({ sortBy: "createdAt", direction: "desc" });
    }
    setConditions(newConditions);
  };

  useEffect(() => {
    refetch();
  }, [debounceValue, rate, location.lat, location.long, sort]);

  if (error) {
    errorToast({
      actionName: "Tải sân",
      code: (error as AxiosError).response?.status,
    });
  }

  return (
    <div className="flex flex-col space-y-4 w-full lg:w-2/3 xl:w-1/2">
      <div className="flex items-center space-x-2 md:space-x-4">
        <Select onValueChange={setPitchType}>
          <SelectTrigger className="w-full min-w-[100px] md:min-w-[200px] rounded-full flex-1">
            <SelectValue className="truncate">
              {pitchTypeToString(pitchType)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {isLoadingPitchTypes ? (
              <SelectItem value="soccer">Loading...</SelectItem>
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
        <Input
          type="text"
          className="rounded-full flex-2"
          placeholder="Tìm kiếm"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
      <div className="mt-4 flex justify-around space-x-2 md:space-x-4 ">
        {Conditions.map((condition) => (
          <Button
            key={condition.value}
            className={cn(
              "rounded-full w-1/3",
              conditions.includes(condition.value)
                ? "bg-emerald-500 text-white"
                : "bg-gray-200 text-gray-500"
            )}
            onClick={() => handleConditionChange(condition.value)}
          >
            <span className="mr-2">{condition.title}</span>
            {condition.value === "near" ? (
              <MapPin />
            ) : condition.value === "quality" ? (
              <Star />
            ) : (
              <CircleDollarSign />
            )}
          </Button>
        ))}
      </div>
      <div className="mt-4 list-inside list-disc no-scrollbar">
        {isFetching || error ? (
          <div className="flex gap-2 bg-white shadow rounded-lg p-2 md:pd-4 mb-4">
            <Skeleton className="w-[200px] h-[200px]" />
            <Skeleton className="flex-1 h-[200px]" />
          </div>
        ) : (
          data?.pages.map((group, i) => {
            const pitches = group?.result.data;
            return (
              <React.Fragment key={i}>
                {pitches?.map((pitch: IPitch) => (
                  <PitchItem key={pitch?.pitch_id} pitch={pitch} />
                ))}
              </React.Fragment>
            );
          })
        )}
        <div>
          <Button
            variant="ghost"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Đang tải..."
              : hasNextPage
              ? "Tải thêm"
              : "Không có gì để hiển thị thêm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

export function PitchItem({ pitch }: { pitch: IPitch }) {
  const handleNavigateToGoogleMap = () => {
    let href = `https://www.google.com/maps/place/`;
    if (pitch.lat && pitch.long)
      href += `@${pitch.lat},${pitch.long},16z?entry=ttu`;
    else
      href = `https://www.google.com/maps/search/${pitch.name.replace(
        " ",
        "+"
      )}`;

    window.open(href, "_blank");
  };

  return (
    <div className="relative flex flex-1 space-x-2 bg-white shadow rounded-lg p-2 md:pd-4 mb-4">
      <Link
        href={`/${pitch?.slug}`}
        className="flex justify-between items-start w-full gap-2"
      >
        <Image
          src={pitch.logo || "/pitch4u-logo.png"}
          width={200}
          height={200}
          alt={pitch.name}
          className="border rounded w-1/3"
        />
        <div className="flex flex-col justify-between h-full flex-1">
          <div className="md:space-y-2">
            <h3 className="text-md md:text-xl font-semibold text-gray-800">
              {pitchTypeToString(pitch.type)} {pitch?.name}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm">{pitch.address}</p>
            <Stars className="flex text-sm" rating={Number(pitch?.rate)} />
          </div>
          <p className="font-semibold md:text-xl text-end pr-2 md:pr-10">
            {pitch?.min_price === pitch?.max_price
              ? pitch?.max_price?.toLocaleString()
              : `${pitch?.min_price?.toLocaleString()} - ${pitch?.max_price?.toLocaleString()}`}{" "}
            <span className="text-sm font-normal">VND/h</span>
          </p>
        </div>
      </Link>
      <Button
        variant="ghost"
        className="hidden md:block absolute top-0 right-0"
        onClick={handleNavigateToGoogleMap}
      >
        <MapPin color="green" />
      </Button>
    </div>
  );
}
