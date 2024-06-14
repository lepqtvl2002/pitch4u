"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IPitch } from "@/types/pitch";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function ImageGallery({ pitch }: { pitch: IPitch }) {
  const [bigImage, setBigImage] = useState(pitch?.images[0]); // Initialize bigImage with the first image URL

  const handleMiniImageClick = (imageUrl: string) => {
    // Update the bigImage when a mini image is clicked
    setBigImage(imageUrl);
  };

  return (
    <div className={"md:rounded relative"}>
      <div
        className={
          "flex justify-center w-full h-[260px] md:h-[460px] p-2 md:p-4 border border-main md:rounded"
        }
      >
        <Image
          src={bigImage}
          alt="Big Image"
          width={2000}
          height={2000}
          className={"w-auto h-full content-center"}
        />
      </div>
      <ScrollArea className="w-full">
        <div className="flex space-x-2 md:space-x-4 py-1 px-1 mt-2 md:mt-4 items-center border border-main md:rounded">
          {pitch.images.map((imageUrl: string, index: number) => (
            <Image
              key={imageUrl + index}
              src={imageUrl}
              alt={`Mini Image ${index}`}
              width={1000}
              height={1000}
              className="h-24 md:h-40 border m-auto rounded hover:cursor-pointer object-cover"
              onClick={() => handleMiniImageClick(imageUrl)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
