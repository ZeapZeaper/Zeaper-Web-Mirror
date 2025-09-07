import { useEffect, useState } from "react";
import NoPic from "@/images/noPhoto.png";
import Image from "next/image";

const ProductImage = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [hooveredImage, setHooveredImage] = useState<string | null>(null);

  useEffect(() => {
    if (images && images?.length > 0 && !images.includes(selectedImage)) {
      setSelectedImage(images[0]);
    }
  }, [images, selectedImage]);
  return (
    <div className="flex flex-col-reverse 2xl:flex-row gap-2">
      <div className="flex 2xl:flex-col gap-2 flex-wrap">
        {images?.map((image, index) => (
          <Image
            width={100}
            height={100}
            sizes="100vw"
            key={index}
            src={image}
            alt="product"
            className={`w-30 h-30 object-contain cursor-pointer ${
              selectedImage === image ? "border-2 border-darkGold" : ""
            }`}
            onClick={() => setSelectedImage(image)}
            onMouseOver={() => setHooveredImage(image)}
            onMouseOut={() => setHooveredImage(null)}
          />
        ))}
      </div>
      <div>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={hooveredImage || selectedImage || NoPic}
          alt="product"
          className="w-full h-full  object-contain max-w-[35rem]"
        />
      </div>
    </div>
  );
};

export default ProductImage;
