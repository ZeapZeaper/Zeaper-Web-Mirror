import VendorProduct from "./VendorProduct";

const VendorProductPage = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  return (
    <div className="p-4 py-6 lg:pb-28 bg-neutral-100">
      {id && <VendorProduct id={id.replaceAll("-", "/")} />}
    </div>
  );
};

export default VendorProductPage;
