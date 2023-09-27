"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ pitch }: { pitch: any }) {
  const [bigImage, setBigImage] = useState(pitch.imageUrls[0]); // Initialize bigImage with the first image URL

  const handleMiniImageClick = (imageUrl: string) => {
    // Update the bigImage when a mini image is clicked
    setBigImage(imageUrl);
  };

  return (
    <div className={"md:rounded"}>
      <div
        className={
          "flex justify-center w-full h-[260px] md:h-[460px] p-2 md:p-4 border border-main md:rounded"
        }
      >
        <Image
          src={bigImage}
          alt="Big Image"
          width={460}
          height={460}
          className={"w-auto h-full content-center"}
        />
      </div>
      <div className="flex space-x-2 md:space-x-4 w-full py-1 px-1 h-24 md:h-60 overflow-auto mt-2 md:mt-4 items-center border border-main md:rounded">
        {pitch.imageUrls.map((imageUrl: string, index: number) => (
            <Image
              key={imageUrl + index}
              src={imageUrl}
              alt="Mini Image 1"
              width={100}
              height={100}
              style={{ objectFit: "contain" }}
              className={"w-1/4 h-full border m-auto rounded hover:cursor-pointer"}
              onClick={() => handleMiniImageClick(imageUrl)}
            />
        ))}
      </div>
    </div>
  );
}
