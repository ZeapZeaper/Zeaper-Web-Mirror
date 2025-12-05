"use client";

import Image from "next/image";
import NoPic from "@/images/noPhoto.png";

export default function ProductCardImage({
  src,
  alt,
  onWishlistClick,
  wishIcon,
}: {
  src: string;
  alt: string;
  onWishlistClick: (e: React.MouseEvent) => void;
  wishIcon: React.ReactNode;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-slate-100">
      {/* Aspect ratio container – this is FashionNova’s key trick */}
      <div className="relative w-full aspect-[2/3]"> 
        <Image
          src={src || NoPic.src}
          alt={alt}
          fill
          sizes="
            (max-width: 344px) 200px,
            (max-width: 375px) 200px,
            (max-width: 639px) 250px,
            (max-width: 767px) 300px,
            (max-width: 989px) 350px,
            (max-width: 1179px) 250px,
            (max-width: 1366px) 300px,
            (max-width: 1800px) 400px,
            400px
          "
          className="object-cover w-full h-full inset-0 absolute transition-transform duration-500 hover:scale-105"
          priority={false}
        />
      </div>

      {/* Wishlist button */}
      <button
        type="button"
        onClick={onWishlistClick}
        className="absolute top-2 right-2 z-20 p-1 rounded-full"
        aria-label="wishlist"
      >
        {wishIcon}
      </button>
    </div>
  );
}
