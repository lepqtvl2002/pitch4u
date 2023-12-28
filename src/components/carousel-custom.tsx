import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ImageWithFallback } from "./image-with-fallback";
import { cn, isValidUrl } from "@/lib/utils";

export function CarouselImages({
  imageUrls,
  sizeImage = 100,
  className,
}: {
  imageUrls: string[] | undefined;
  sizeImage?: number;
  className?: string;
}) {
  return (
    <Carousel className={cn("w-full max-w-xs", className)}>
      <CarouselContent>
        {imageUrls?.map((imageUrl, index) => (
          <CarouselItem key={index}>
            <Card className="p-1">
              <CardContent>
                <ImageWithFallback
                  width={sizeImage}
                  height={sizeImage}
                  className="w-full h-full"
                  src={isValidUrl(imageUrl) ? imageUrl : "/fallback-image.png"}
                  alt={imageUrl}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
