"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import { IPitch } from "@/types/pitch";
import { PitchUseQuery } from "@/server/queries/pitch-queries";
import Link from "next/link";
import { CircleDollarSign, MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import Image from "next/image";
import { Stars } from "../ui/vote-stars";

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
  const [conditions, setConditions] = useState<string[]>([]);
  const [pitches, setPitches] = useState<IPitch[]>([]);
  const debouncedSearch = useDebounce(searchQuery);
  const { data, isFetching, isError } = PitchUseQuery.search({
    name: debouncedSearch,
    limit: 10,
    page: 1,
  });
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleConditionChange = (condition: string) => {
    if (conditions.includes(condition)) {
      setConditions(conditions.filter((c) => c !== condition));
    } else {
      setConditions([...conditions, condition]);
    }
  };

  useEffect(() => {
    if (data?.result?.data) setPitches(data?.result?.data);
  }, [data]);

  if (isError) {
    toast({
      title: "Có lỗi xảy ra khi tải sân bóng",
      description: "Vui lòng thử lại",
      variant: "destructive",
    });
    return <></>;
  }

  return (
    <div className="flex flex-col space-y-4 w-full md:w-2/3 xl:w-1/2">
      <div className="flex items-center space-x-2 md:space-x-4">
        <input
          type="text"
          className="rounded-full w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              "rounded-full w-1/3 hover:bg-emerald-300",
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
      <div className="mt-4 list-inside list-disc max-h-screen overflow-y-auto no-scrollbar">
        {isFetching ? (
          <div>Loading...</div>
        ) : (
          pitches.map((pitch: IPitch) => (
            <PitchItem key={pitch?.pitch_id} pitch={pitch} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;

function PitchItem({ pitch }: { pitch: IPitch }) {
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
    <div
      className="relative flex space-x-2 bg-white shadow rounded-lg p-2 md:pd-4 mb-4"
      style={{ listStyleType: "none" }}
    >
      <Link
        href={`/${pitch?.slug}`}
        className="flex justify-between items-center w-full gap-2"
      >
        <Image
          src={pitch.logo || "/pitch4u-logo.png"}
          width={200}
          height={200}
          alt={pitch.name}
          className="border rounded"
        />
        <div className="flex flex-col justify-around h-full flex-1">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-800">{pitch?.name}</h3>
            <p className="text-gray-600 text-sm">{pitch.address}</p>
            <Stars className="flex text-sm" rating={Number(pitch?.rate)} />
          </div>
          <p className="font-semibold text-xl text-end pr-10">
            {pitch?.min_price === pitch?.max_price
              ? pitch?.max_price
              : `${pitch?.min_price} - ${pitch?.max_price}`}{" "}
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
