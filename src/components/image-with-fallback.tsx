import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

import logo from "../../public/pitch4u-logo.png";
import fallbackImage from "../../public/fallback-image.png";

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps["src"];
}

export const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
};
