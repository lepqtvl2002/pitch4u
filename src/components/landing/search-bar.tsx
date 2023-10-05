"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useDebounce from "@/hooks/use-debounce";
import { IPitch } from "@/types/pitch";
import { PitchUseQuery } from "@/server/queries/pitch-query";

const Conditions = ["Gần bạn", "Chất lượng", "Giá cả"];

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
    q: debouncedSearch,
    limit: 10,
    page: 1,
  });
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // const handleSearchFormSubmit = () => {
  //     // Perform search operation
  //     performSearch(searchQuery);
  //     //     Code here
  // };
  //
  // const performSearch = (query: string) => {
  //     // Validate the search query
  //     if (query.trim() === "") {
  //         console.error("Invalid search query.");
  //         return;
  //     }
  //
  //     // Perform the search operation
  //     console.log(`Performing search for query: ${query}`);
  //     // ... Perform the actual search operation here ...
  // };

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

  return (
    <div className="flex flex-col space-y-4 w-full md:w-2/3 xl:w-1/2">
      <div className="flex items-center space-x-2 md:space-x-4">
        <input
          type="text"
          className="rounded-full w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <Button className="rounded-full" onClick={() => {}}>
          Search
        </Button>
      </div>
      <div className="mt-4 flex justify-around space-x-2 md:space-x-4 ">
        {Conditions.map((condition) => (
          <Button
            key={condition}
            className={`rounded-full w-1/3 ${
              conditions.includes(condition)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => handleConditionChange(condition)}
          >
            {condition}
          </Button>
        ))}
      </div>
      <div className="mt-4 list-inside list-disc max-h-screen overflow-y-auto">
        {pitches.map((pitch : IPitch) => (
          <li
            key={pitch?.pitch_id}
            className="bg-white shadow rounded-lg p-4 mb-4"
            style={{ listStyleType: "none" }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {pitch?.name}
                </h3>
                <p className="text-gray-600">{pitch?.address}</p>
              </div>
              <div>
                <p className="text-gray-800 font-semibold">{pitch?.address}</p>
                {/*<p className="text-gray-800 font-semibold">{pitch.price}</p>*/}
                {/*<p className="text-gray-800 font-semibold">{pitch.quality}</p>*/}
                {/*<p className="text-gray-800 font-semibold">{pitch.distance}</p>*/}
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
