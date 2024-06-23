"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import { IPitch } from "@/types/pitch";
import Link from "next/link";
import { CircleDollarSign, MapPin, Star } from "lucide-react";
import { cn, sortDirectionToString } from "@/lib/utils";
import Image from "next/image";
import { Stars } from "../../../../components/ui/vote-stars";
import { pitchTypeToIcon, pitchTypeToString } from "@/lib/convert";
import { Input } from "../../../../components/ui/input";
import SelectPitchType from "../../../../components/select-pitch-type";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import { Icons } from "../../../../components/icons";
import { pitchTypeVariant } from "@/lib/variant";
import FilterSelector from "./filter-selector";
import { CITIES, STAR_RATING } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * SearchBar component.
 *
 * @returns JSX element representing the search bar.
 */
const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debounceValue = useDebounce(searchQuery);

  const [pitchType, setPitchType] = React.useState<string>("");

  const [location, setLocation] = useState<{ long?: number; lat?: number }>({
    long: undefined,
    lat: undefined,
  });
  const [sort, setSort] = React.useState<{
    sortBy: string;
    direction: "asc" | "desc";
  }>({
    sortBy: "price",
    direction: "asc",
  });
  const [city, setCity] = useState("");
  const [starRating, setStarRating] = useState(0);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
    refetch,
    remove,
  } = PitchUseQuery.getPitchesInfinite({
    limit: 3,
    long: location.long,
    lat: location.lat,
    name: searchQuery,
    rate_gte: starRating,
    pitchType,
    sort: sort.direction,
    sortBy: sort.sortBy,
    city,
  });

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    remove();
    refetch();
  }, [
    debounceValue,
    location,
    sort,
    city,
    starRating,
    pitchType,
    refetch,
    remove,
  ]);

  return (
    <div className="flex flex-col space-y-4 w-full lg:w-2/3 xl:w-1/2">
      <div className="flex items-center space-x-2 md:space-x-4">
        <SelectPitchType pitchType={pitchType} setPitchType={setPitchType} />
        <Input
          type="text"
          className="rounded-full flex-2"
          placeholder="Tìm kiếm theo tên sân"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>
      <div className="mt-4 flex justify-around space-x-2 md:space-x-4">
        <div className="relative flex w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-emerald-500 p-2 z-10"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition((position) => {
                    setLocation({
                      lat: position.coords.latitude,
                      long: position.coords.longitude,
                    });
                  });
                  setCity("");
                }}
              >
                <MapPin className="text-emerald-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tìm sân gần bạn</p>
            </TooltipContent>
          </Tooltip>
          <div className="absolute w-10 p-2 left-2 rounded-e-full bg-emerald-50 h-full border-r"></div>
          <FilterSelector
            className="rounded-e-full"
            onChange={setCity}
            items={CITIES.map((city) => ({
              title: city.value,
              value: city.value,
            }))}
            trigger={
              <span className="flex justify-end items-center">
                {city ? city : "Gần bạn"}
              </span>
            }
          />
        </div>
        <FilterSelector
          className="rounded-full"
          onChange={(value) => setStarRating(Number(value))}
          items={STAR_RATING.map((item) => ({
            title: item.value,
            value: item.key,
          }))}
          trigger={
            <span className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-300" />
              {starRating ? `${starRating} sao` : "Tất cả"}
            </span>
          }
        />
        <FilterSelector
          className="rounded-full"
          onChange={(value) =>
            setSort({ sortBy: "price", direction: value as "asc" | "desc" })
          }
          items={[
            {
              title: "Tăng dần",
              value: "asc",
            },
            {
              title: "Giảm dần",
              value: "desc",
            },
          ]}
          trigger={
            <span className="flex items-center">
              <CircleDollarSign
                fill="yellow"
                className="w-4 h-4 mr-2 text-yellow-500"
              />
              Giá cả {sortDirectionToString(sort.direction)}
            </span>
          }
        />
      </div>
      <div className="mt-4 list-inside list-disc no-scrollbar">
        {isInitialLoading ? (
          <p>Đang tải...</p>
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
        <div className={isInitialLoading ? "hidden" : "block"}>
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
  const Icon = Icons[pitchTypeToIcon(pitch.type)];
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
    <div className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:shadow-2xl relative flex flex-1 space-x-2 bg-white shadow rounded-lg p-2 md:pd-4 mb-4">
      <Link
        href={`/${pitch?.slug}`}
        className="flex justify-between items-start w-full gap-2"
      >
        <Image
          src={pitch.logo || "/pitch4u-logo.png"}
          width={200}
          height={200}
          alt={pitch.name}
          className="border rounded w-40 h-40 object-cover"
        />
        <div className="flex flex-col justify-between h-full flex-1">
          <div className="md:space-y-2">
            <h3 className="text-md md:text-xl font-medium">{pitch?.name}</h3>
            <p
              className={cn(
                "inline-flex items-center",
                pitchTypeVariant({ variant: pitch.type })
              )}
            >
              <Icon className={cn("w-4 h-4 mr-2")} />
              {pitchTypeToString(pitch.type)}
            </p>
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
