"use client";
import React, { useState } from 'react';
import Image from "next/image";

export default function ImageGallery({ pitch } : {pitch: any}) {
    const [bigImage, setBigImage] = useState(pitch.imageUrls[0]); // Initialize bigImage with the first image URL

    const handleMiniImageClick = (imageUrl : string) => {
        // Update the bigImage when a mini image is clicked
        setBigImage(imageUrl);
    };

    return (
        <div className={"rounded"}>
            <div className={"flex justify-center w-full h-[460px] p-4 border border-main rounded"}>
                <Image
                    src={bigImage}
                    alt="Big Image"
                    width={460}
                    height={460}
                    className={"w-auto h-full content-center"}
                />
            </div>
            <div className="flex space-x-4 w-full overflow-auto mt-4 items-center border border-main rounded">
                {pitch.imageUrls.map((imageUrl : string, index : number) => (
                    <Image
                        key={imageUrl + index}
                        src={imageUrl}
                        alt="Mini Image 1"
                        width={100}
                        height={100}
                        className={"w-1/4 h-full hover:cursor-pointer"}
                        onClick={() => handleMiniImageClick(imageUrl)} // Add onClick event handler
                    />
                ))}
            </div>
        </div>
    );
}
