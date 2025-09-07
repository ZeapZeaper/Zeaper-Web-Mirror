import Link from "next/link";

const ShopProductNav = ({
  status,
  shopId,
}: {
  status: string;
  shopId: string;
}) => {
  const listOfStatus = ["Live", "Draft", "Under Review", "Rejected", "Deleted"];
  return (
    <div className="inline-flex overflow-scroll rounded w-full">
      {listOfStatus.map((item) => (
        <Link
          key={item}
          href={`/shop/${shopId}/products?status=${item.toLowerCase()}&page=1`}
          className={`inline-flex w-full h-7 md:h-10 ${
            status === item?.toLowerCase() && "bg-primary text-white"
          } items-center justify-center gap-2 whitespace-nowrap border border-2 border-primary px-2 md:px-5 text-sm sm:text-xs font-medium tracking-wide dark:text-white transition duration-300 hover:bg-primary hover:text-white focus-visible:outline-none`}
        >
          <span className="text-xs md:text-sm">{item}</span>
        </Link>
      ))}
    </div>
  );
};

export default ShopProductNav;
