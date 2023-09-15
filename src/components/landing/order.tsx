import React from "react";
import ImageGallery from "@/app/(general)/[id]/components/image-show";
import OrderSelections from "@/app/(general)/[id]/components/order-selections";

const PitchOrder = ({pitch}: { pitch: any }) => {
    return (
        <div className="flex bg-white rounded p-4 space-x-8">
            <div className="w-1/2">
                <ImageGallery pitch={pitch}/>
            </div>
            <div className="flex flex-col space-y-8 w-1/2">
                <OrderSelections pitch={pitch}/>
            </div>
        </div>
    );
};

export default PitchOrder;

