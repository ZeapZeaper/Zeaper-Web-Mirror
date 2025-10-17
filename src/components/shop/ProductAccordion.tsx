import { ProductInterface } from "@/interface/interface";
import { Accordion, Badge } from "flowbite-react";

const ProductAccordion = ({ product }: { product: ProductInterface }) => {
  const categories = product?.categories;

  // Ensure productType is treated as string for comparison
  const productType = product?.productType as string;

  const isFootwear =
    productType === "readyMadeShoe" || productType === "bespokeShoe";
  const isClothe =
    productType === "readyMadeCloth" || productType === "bespokeCloth";
  const isAccessory = productType === "accessory";
  return (
    <Accordion className="w-full" alwaysOpen={true}>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Product ID
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap">{product?.productId}</div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          ID
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap">
            {product?.productId.substring(12)}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Main
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap">
            {categories?.main?.map((category: string, index: number) => (
              <Badge key={index} color="info">
                {category}
              </Badge>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Designs
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap flex-wrap">
            {categories?.design?.map((category: string, index: number) => (
              <Badge key={index} color="info">
                {category}
              </Badge>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Panel>

      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Fit
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap">
            {categories?.fit?.map((category: string, index: number) => (
              <Badge key={index} color="info">
                {category}
              </Badge>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Style
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap">
            {categories?.style?.map((category: string, index: number) => (
              <Badge key={index} color="info">
                {category}
              </Badge>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Occasion
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap flex-wrap">
            {categories?.occasion?.map((category: string, index: number) => (
              <Badge key={index} color="info">
                {category}
              </Badge>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Fastening
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap">
            {categories?.fastening?.map((category: string, index: number) => (
              <Badge key={index} color="info">
                {category}
              </Badge>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Gender
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2 flex-wrap">
            {categories?.gender?.map((category: string, index: number) => (
              <Badge key={index} color="info">
                {category}
              </Badge>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      {isClothe ? (
        <Accordion.Panel>
          <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
            Sleeve Length
          </Accordion.Title>
          <Accordion.Content>
            <div className="flex gap-2">
              <Badge color="info">{categories?.sleeveLength}</Badge>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      ) : (
        <></>
      )}
      {isFootwear ? (
        <>
          <Accordion.Panel>
            <Accordion.Title className="h-8 text-md rounded-md items-center flex">
              Heel Type
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex gap-2">
                <Badge color="info">{categories?.heelType}</Badge>
              </div>
            </Accordion.Content>
          </Accordion.Panel>

          <Accordion.Panel>
            <Accordion.Title className="h-8 text-md rounded-md items-center flex">
              Heel Height
            </Accordion.Title>
            <Accordion.Content>
              <div className="flex gap-2">
                <Badge color="info">{categories?.heelHeight}</Badge>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
        </>
      ) : (
        <></>
      )}

      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Product Group
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2">
            <Badge color="info">{categories?.productGroup}</Badge>
          </div>
        </Accordion.Content>
      </Accordion.Panel>

      {isAccessory ? (
        <Accordion.Panel>
          <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
            Accessory Type
          </Accordion.Title>
          <Accordion.Content>
            <div className="flex gap-2">
              <Badge color="info">{categories?.accessoryType}</Badge>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      ) : (
        <></>
      )}
      <Accordion.Panel>
        <Accordion.Title className="h-8 text-md rounded-md items-center  flex">
          Brand
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2">
            <Badge color="info">{categories?.brand}</Badge>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Age Group
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2">
            <Badge color="info">{categories?.age?.ageGroup}</Badge>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
          Age Range
        </Accordion.Title>
        <Accordion.Content>
          <div className="flex gap-2">
            <Badge color="info">
              {categories?.age?.ageGroup === "Adults"
                ? "N/A"
                : categories?.age?.ageRange}
            </Badge>
          </div>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
  );
};

export default ProductAccordion;
