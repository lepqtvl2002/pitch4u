import Image from "next/image";
import React from "react";

const PitchOrder = () => {
    return (
        <div className="flex">
            <div className="w-1/2">
                <Image
                    src="/pitch4u-logo.png"
                    alt="Big Image"
                    width={500}
                    height={500}
                />
                <div className="grid grid-cols-3 gap-4">
                    <Image
                        src="/pitch4u-logo.png"
                        alt="Mini Image 1"
                        width={100}
                        height={100}
                    />
                    <Image
                        src="/pitch4u-logo.png"
                        alt="Mini Image 2"
                        width={100}
                        height={100}
                    />
                    <Image
                        src="/pitch4u-logo.png"
                        alt="Mini Image 3"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className="flex flex-col space-y-8 w-1/2">
                <h2 className="text-bold text-4xl">Heading</h2>
                <p className="">Address</p>
                <div className="flex flex-col">
                    <select className="p-2 border border-gray-300 rounded mt-2" name="date" id="date">
                        <option value="">Pick a date</option>
                        {/* <!-- Insert date options here --> */}
                    </select>
                    <select className="p-2 border border-gray-300 rounded mt-2" name="time" id="time">
                        <option value="">Pick a time</option>
                        {/* <!-- Insert time options here --> */}
                    </select>
                    <select className="p-2 border border-gray-300 rounded mt-2" name="pitch" id="pitch">
                        <option value="">Pick a pitch</option>
                        {/* <!-- Insert pitch options here --> */}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default PitchOrder;

