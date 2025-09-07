"use client";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

import { Accordion, Alert, Badge, Button, Table } from "flowbite-react";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { ColorInterface, VariationInterface } from "@/interface/interface";
import Loading from "@/app/loading";
import ProductImage from "@/app/products/[product]/ProductImage";
import ProductReview from "@/app/products/[product]/ProductReview";
import { getStatusColor, numberWithCommas } from "@/utils/helpers";
import ProductPromo from "@/components/promo/ProductPromo";
import ShopProductTimeline from "@/components/shop/ShopProductTimeline";
import ProductActions from "@/components/shop/ProductActions";
import { useSearchParams } from "next/navigation";
import ProductDescription from "@/app/products/[product]/ProductDescription";
import { ManageVariationDrawer } from "@/components/shop/ManageVariationDrawer";
import { ManageAutoPriceDrawer } from "@/components/shop/ManageAutoPriceDrawer";

interface ColInterface {
  name: string;
  hex?: string;
  background?: string;
}
const VendorProduct = ({ id }: { id: string }) => {
  const token = useSelector(globalSelectors.selectAuthToken);

  const searchParams = useSearchParams();
  const color = searchParams.get("color");
  const urlParams = new URLSearchParams(searchParams.toString());
  const currency = useSelector(globalSelectors.selectCurrency);
  const [openManageVariation, setOpenManageVariation] =
    useState<boolean>(false);
  const [openManageAutoPrice, setOpenManageAutoPrice] =
    useState<boolean>(false);
  const productQuery = zeapApiSlice.useGetProductQuery(
    { productId: id, currency: "NGN" },
    { skip: !token }
  );
  const product = productQuery?.data?.data;
  const categories = product?.categories;
  const productOptionsQuery = zeapApiSlice.useGetProductsOptionsQuery(
    {},
    { skip: !token }
  );
  const options = productOptionsQuery?.data?.data;
  const colors: ColInterface[] = options?.readyMadeClothes?.colorEnums;
  const isLoading = productQuery.isLoading || productOptionsQuery.isLoading;
  const isBeskope = categories?.productGroup === "Bespoke";
  const variations = product?.variations;
  const bespokeVariation = variations?.find(
    (variation: VariationInterface) => variation.colorValue === "Bespoke"
  )?.bespoke;
  const [images, setImages] = useState<string[]>([]);
  const [numberOfShownVariations, setNumberOfShownVariations] =
    useState<number>(5);
  const [viewAllTimeline, setViewAllTimeline] = useState<boolean>(false);
  const getTextColor = (hex: string) => {
    const red = parseInt(hex?.substring(1, 3), 16);
    const green = parseInt(hex?.substring(3, 5), 16);
    const blue = parseInt(hex?.substring(5, 7), 16);
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
      ? "text-black"
      : "text-white";
  };
  useEffect(() => {
    if (!color && product) {
      setImages(
        product.colors[0]?.images.map((image: { link: string }) => image.link)
      );
    }
  }, [product, color]);
  useEffect(() => {
    if (product) {
      const color = product.colors.find(
        (color: ColorInterface) => color.value === searchParams.get("color")
      );
      if (color) {
        setImages(color?.images.map((image: { link: string }) => image.link));
      }
    }
  }, [product, searchParams]);

  const getBg = (value: string) => {
    if (value.toLocaleLowerCase() === "bespoke")
      return "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(204,23,195,0.09147408963585435) 4%, rgba(205,64,138,0.5172443977591037) 25%, rgba(207,136,39,1) 37%, rgba(13,15,25,1) 44%, rgba(32,37,4,1) 45%, rgba(72,84,9,0.4472163865546218) 100%)";
    const color = colors?.find((color) => color.name === value);
    return color?.hex || color?.background;
  };

  return (
    <div className="">
      {isLoading && <Loading />}
      {!product?._id && productQuery?.status === "fulfilled" && (
        <Alert color="info">Product not found</Alert>
      )}
      {product?._id && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="">
            {product?.colors?.length > 0 && (
              <ProductImage images={images || []} />
            )}
            {product?.colors?.length === 0 && (
              <div className="flex items-center h-100">
                <Alert color="info">
                  No images or colours uploaded yet found for this product
                </Alert>
              </div>
            )}
            <div className="hidden md:block mt-4">
              <div className="text-darkGold text-lg mt-4">Reviews</div>
              <div>
                <ProductReview product={product} />
              </div>
            </div>
          </div>
          <div className=" flex flex-col">
            <div>
              <p className="text-2xl font-bold">{product?.title}</p>
              <p className="text-md text-slate-500">{product?.subTitle}</p>
            </div>

            <div>
              <div className="text-darkGold text-lg mt-4 font-semibold">
                Status
              </div>
              <Badge
                size="md"
                color={getStatusColor(product?.status)}
                className="w-fit"
              >
                {product?.status}
              </Badge>
            </div>
            <div>
              <div className="text-darkGold text-lg mt-4 font-semibold">
                Colors
              </div>
              <p>{color}</p>
              <div className="flex gap-2 flex-wrap">
                {product?.colors?.map(
                  (color: ColorInterface, index: number) => (
                    <div
                      onClick={() => {
                        urlParams.set("color", color?.value);
                        setImages(color?.images.map((image) => image.link));
                      }}
                      key={index}
                      className="w-8 h-8 rounded-full cursor-pointer border  border-slate-200"
                      style={{ background: getBg(color?.value) }}
                    ></div>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="text-darkGold text-lg mt-4 font-semibold mb-1">
                Sizes {product?.sizeStandard && `(${product?.sizeStandard})`}
              </div>
              <div className="flex gap-2">
                {product?.sizes?.map((size: string, index: number) => (
                  <div
                    key={index}
                    className="p-2 border rounded-md cursor-pointer"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-darkGold text-lg mt-4 font-semibold">
                Prices
              </div>
              <div className="flex gap-2 flex-wrap">
                {product?.variations?.map(
                  (variation: VariationInterface, index: number) => (
                    <div
                      key={index}
                      className="p-2 border rounded-md cursor-pointer"
                    >
                      {currency?.symbol}
                      {numberWithCommas(variation?.price)}
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <ProductDescription description={product?.description} />
            </div>
            <div className="w-full ">
              <div className="text-darkGold text-lg mt-4 font-semibold">
                Categories
              </div>
              <div className="flex gap-2">
                <Accordion className="w-full">
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Product ID
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {product?.productId}
                      </div>
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
                        {categories?.main?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Designs
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap flex-wrap">
                        {categories?.design?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Fit
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.fit?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Style
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.style?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Occasion
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap flex-wrap">
                        {categories?.occasion?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Fastening
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.fastening?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Gender
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2 flex-wrap">
                        {categories?.gender?.map(
                          (category: string, index: number) => (
                            <Badge key={index} color="info">
                              {category}
                            </Badge>
                          )
                        )}
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
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
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Heel Type
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.heelType}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
                  <Accordion.Panel>
                    <Accordion.Title className=" h-8 text-md rounded-md items-center  flex">
                      Heel Height
                    </Accordion.Title>
                    <Accordion.Content>
                      <div className="flex gap-2">
                        <Badge color="info">{categories?.heelHeight}</Badge>
                      </div>
                    </Accordion.Content>
                  </Accordion.Panel>
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
              </div>

              <div>
                <div className="flex justify-between mt-4 item-center mb-2">
                  <span className="text-darkGold text-lg font-semibold ">
                    Variation
                  </span>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        setNumberOfShownVariations(
                          numberOfShownVariations === 5
                            ? product?.variations?.length
                            : 5
                        );
                      }}
                      color="primary"
                      size="xs"
                    >
                      {numberOfShownVariations === 5 ? "View All" : "View Less"}
                    </Button>
                    {!isBeskope && (
                      <Button
                        className="text-primary"
                        color="primary"
                        size="xs"
                        outline
                        onClick={() => {
                          setOpenManageVariation(!openManageVariation);
                        }}
                      >
                        Manage Variations
                      </Button>
                    )}
                  </div>
                  {openManageVariation && (
                    <ManageVariationDrawer
                      isOpen={openManageVariation}
                      setIsOpen={setOpenManageVariation}
                      product={product}
                    />
                  )}
                </div>
                <div className="hidden md:block  mb-4 w-inherit overflow-x-auto">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>SKU</Table.HeadCell>
                      <Table.HeadCell>Color</Table.HeadCell>
                      <Table.HeadCell>Size</Table.HeadCell>
                      <Table.HeadCell>Price</Table.HeadCell>
                      <Table.HeadCell>Discount</Table.HeadCell>
                      <Table.HeadCell>Quantity</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y ">
                      {product?.variations
                        ?.slice(0, numberOfShownVariations)
                        ?.map((variation: VariationInterface) => (
                          <Table.Row key={variation.sku}>
                            <Table.Cell className="text-xs font-semibold text-slate-900 ">
                              {variation.sku}
                            </Table.Cell>
                            <Table.Cell>
                              <span
                                className={`text-sm font-semibold p-1 rounded-md ${getTextColor(
                                  getBg(variation.colorValue || "") as string
                                )}`}
                                style={{
                                  background: getBg(variation.colorValue || ""),
                                }}
                              >
                                {variation.colorValue}
                              </span>
                            </Table.Cell>
                            <Table.Cell className="text-darkGold">
                              {variation.size}
                            </Table.Cell>
                            <Table.Cell>
                              {currency?.symbol}
                              {numberWithCommas(variation.price)}
                            </Table.Cell>
                            <Table.Cell>
                              {variation.discount
                                ? `${currency?.symbol}${numberWithCommas(
                                    variation.discount
                                  )}`
                                : "N/A"}
                            </Table.Cell>
                            <Table.Cell>{variation.quantity}</Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                  <div className="flex flex-col  rounded-md p-4 gap-2 bg-white my-4">
                    <div className="flex justify-end">
                      {" "}
                      <Button
                        className="text-primary"
                        color="primary"
                        size="xs"
                        outline
                        onClick={() => {
                          setOpenManageAutoPrice(!openManageAutoPrice);
                        }}
                      >
                        Manage Auto Price Adjustment
                      </Button>
                      {openManageAutoPrice && (
                        <ManageAutoPriceDrawer
                          isOpen={openManageAutoPrice}
                          setIsOpen={setOpenManageAutoPrice}
                          product={product}
                        />
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {" "}
                        Auto Price Adjustment:
                      </span>{" "}
                      <span>
                        <Badge
                          color={
                            product?.autoPriceAdjustment?.isAdjustable
                              ? "success"
                              : "failure"
                          }
                        >
                          {product?.autoPriceAdjustment?.isAdjustable
                            ? "Enabled"
                            : "Disabled"}
                        </Badge>
                      </span>
                    </div>
                    {product?.autoPriceAdjustment?.isAdjustable && (
                      <div className="flex justify-between">
                        <span className="font-semibold">
                          Adjustment Percentage:
                        </span>{" "}
                        <span>
                          <Badge
                            color={
                              product?.autoPriceAdjustment?.adjustmentPercentage
                                ? "success"
                                : "failure"
                            }
                          >
                            +-
                            {product?.autoPriceAdjustment?.adjustmentPercentage}
                            %
                          </Badge>
                        </span>
                      </div>
                    )}
                  </div>
                  {bespokeVariation && (
                    <div className="flex flex-col shadow-md p-4 gap-2">
                      <div className="flex justify-between">
                        <span>Colour Type:</span>{" "}
                        <span>
                          <Badge>{bespokeVariation.colorType}</Badge>
                        </span>
                      </div>
                      {bespokeVariation.availableColors?.length > 0 && (
                        <div className="flex justify-between">
                          <span>Available Colours:</span>{" "}
                          <span className="flex gap-2 flex-wrap">
                            {bespokeVariation.availableColors?.map(
                              (color: string) => (
                                <div
                                  key={color}
                                  className="w-8 h-8 rounded-full cursor-pointer"
                                  style={{ background: getBg(color) }}
                                ></div>
                              )
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="md:hidden">
                  {product?.variations?.map((variation: VariationInterface) => (
                    <div
                      key={variation.sku}
                      className="border rounded p-2 mb-2"
                    >
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-semibold">
                            SKU:{" "}
                            <span className="font-normal text-slate-400">
                              {variation.sku}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            Color:{" "}
                            <span
                              className={`text-sm font-semibold ${getTextColor(
                                getBg(variation.colorValue || "") as string
                              )}`}
                              style={{
                                background: getBg(variation.colorValue || ""),
                              }}
                            >
                              {variation.colorValue}
                            </span>
                          </p>
                          <p className="text-sm font-semibold">
                            Size:{" "}
                            <span className="font-normal text-darkGold">
                              {variation.size}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            Price:{" "}
                            <span className="font-normal text-slate-400">
                              {currency?.symbol}
                              {numberWithCommas(variation.price)}
                            </span>
                          </p>
                          <p className="text-sm font-semibold">
                            Discount:{" "}
                            <span className="font-normal text-slate-400">
                              {variation.discount
                                ? `${currency?.symbol}${numberWithCommas(
                                    variation.discount
                                  )}`
                                : "N/A"}
                            </span>
                          </p>
                          <p className="text-sm font-semibold">
                            Quantity:{" "}
                            <span className="font-normal text-slate-400">
                              {variation.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {bespokeVariation && (
                    <div className="flex flex-col shadow-md p-4">
                      <div className="flex justify-between">
                        <span>Colour Type:</span>{" "}
                        <span>
                          <Badge>{bespokeVariation.colorType}</Badge>
                        </span>
                      </div>
                      {bespokeVariation.availableColors?.length > 0 && (
                        <div className="flex justify-between">
                          <span>Available Colours:</span>{" "}
                          <span className="flex gap-2 flex-wrap">
                            {bespokeVariation.availableColors?.map(
                              (color: string) => (
                                <div
                                  key={color}
                                  className="w-8 h-8 rounded-full cursor-pointer"
                                  style={{ background: getBg(color) }}
                                ></div>
                              )
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="text-darkGold text-lg mt-4 font-semibold">
                  Promo
                </div>
                <div>
                  <ProductPromo productId={product?.productId} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mt-4 item-center mb-2">
                  <span className="text-darkGold text-lg font-semibold">
                    TimeLine
                  </span>
                  <div>
                    <Button
                      onClick={() => {
                        setViewAllTimeline(!viewAllTimeline);
                      }}
                      color="primary"
                      size="xs"
                    >
                      {!viewAllTimeline ? "Expand" : "Collapse"}
                    </Button>
                  </div>
                </div>
                <div>
                  <ShopProductTimeline
                    timeLines={product?.timeLine}
                    viewAll={viewAllTimeline}
                  />
                </div>
              </div>
              <div className="md:hidden ">
                <div className="text-darkGold text-lg mt-4">Reviews</div>
                <div>
                  <ProductReview product={product} />
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      )}
      {product && <ProductActions product={product} />}
    </div>
  );
};

export default VendorProduct;
