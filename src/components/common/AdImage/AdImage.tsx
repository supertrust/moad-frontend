import React from "react";
import Image, { StaticImageData } from "next/image";
import IconRemove from "@images/admin-ad-details/ic-remove.png";
import IconSearch from "@images/admin-ad-details/ic-search.png";
import { clsx } from "clsx";

interface AdImageProps {
  src: string;
  alt?: string;
  className?: string;
  edit?: boolean;
  onRemove?: VoidFunction;
  onView?: VoidFunction;
  onClick?: VoidFunction;
}

function AdImage({
  className,
  src,
  alt,
  onRemove,
  edit,
  onView,
  onClick,
}: AdImageProps) {
  return (
    <div className={clsx("relative h-[156px] w-[198.4px]", className)}>
      <Image
        src={edit ? IconRemove : IconSearch}
        alt=""
        className="absolute right-2 top-2 cursor-pointer"
        onClick={edit ? onRemove && onRemove : onView && onView}
      />
      <Image
        onClick={onClick && onClick}
        src={src}
        alt={alt || ""}
        className="h-full w-full"
        width={20}
        height={20}
      />
    </div>
  );
}

export default AdImage;
