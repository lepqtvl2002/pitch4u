import ImageGallery from "@/app/(general)/[slug]/components/image-show";
import OrderSelections from "@/app/(general)/[slug]/components/order-selections";
import React from "react";

const PitchOrder = ({pitch}: { pitch: any }) => {
    return (
        <div className="flex flex-col md:flex-row bg-white md:rounded p-2 md:p-4 md:space-x-8">
            <div className="w-full md:w-1/2">
                <ImageGallery pitch={pitch}/>
            </div>
            <div className="w-full md:w-1/2">
                <OrderSelections pitch={pitch}/>
            </div>
        </div>
    );
};

export default PitchOrder;

