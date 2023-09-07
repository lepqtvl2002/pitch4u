"use client";
/**
 * This TypeScript program implements a search bar component using ReactJS.
 * The search bar allows users to enter a search query and perform a search operation.
 */

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {PostApi} from "@/server/actions/search";
import useDebounce from "@/hooks/use-debounce";

type postProps = {
    id: number,
    userId: number,
    title: string,
    body: string,
}

const Conditions = ["Gần bạn", "Chất lượng", "Giá cả"];
const Pitches = [
    {
        name: "Sân bóng 1",
        address: "123 abc",
        price: 100000,
        quality: 5,
        distance: 10
    },
]
/**
 * SearchBar component.
 *
 * @returns JSX element representing the search bar.
 */
const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [conditions, setConditions] = useState<string[]>([]);
    const [posts, setPosts] = useState<postProps[]>([]);
    const debouncedSearch = useDebounce(searchQuery);
    const {data: postList, isFetching} = PostApi.search({q: debouncedSearch});
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
    }

    useEffect(() => {
        console.log(postList)
        if (postList) setPosts(postList);
    }, [postList])


    return (
        <div className="flex flex-col space-y-4 w-full md:w-2/3 xl:w-1/2">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    className="rounded-full w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
                <Button className="rounded-full" onClick={() => {
                }}>
                    Search
                </Button>
            </div>
            <div className="mt-4 flex justify-around space-x-4 ">
                {Conditions.map((condition) => (
                    <Button
                        key={condition}
                        className={`rounded-full w-1/3 ${conditions.includes(condition) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
                        onClick={() => handleConditionChange(condition)}
                    >
                        {condition}
                    </Button>
                ))}
            </div>
            {isFetching ? <div>Loading</div> :
                <ul className="mt-4 list-inside list-disc">
                    {posts.map((pitch) => (
                        <li key={pitch?.id} className="bg-white shadow rounded-lg p-4 mb-4"
                            style={{listStyleType: 'none'}}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{pitch?.title}</h3>
                                    <p className="text-gray-600">{pitch?.userId}</p>
                                </div>
                                <div>
                                    <p className="text-gray-800 font-semibold">{pitch?.body}</p>
                                    {/*<p className="text-gray-800 font-semibold">{pitch.price}</p>*/}
                                    {/*<p className="text-gray-800 font-semibold">{pitch.quality}</p>*/}
                                    {/*<p className="text-gray-800 font-semibold">{pitch.distance}</p>*/}
                                </div>
                            </div>
                        </li>

                    ))}
                </ul>}
        </div>
    );
};

export default SearchBar;
