import { ShopAnaliticsInterface } from '@/interface/interface';
import StatCard2 from '@/shared/Card/StatCard2';
import { capitalizeFirstLetter } from '@/utils/helpers';
import ShopSalesCount from './ShopSalesCount';
import ShopSalesRevenue from './ShopSalesRevenue';


const ShopOverview = ({
  shopAnalytics,
}: {
  shopAnalytics: ShopAnaliticsInterface;
}) => {
  const productSold = shopAnalytics?.productSold;
  const ordersCountByStatus = shopAnalytics.ordersCountByStatus;
  const productGroupsCount = shopAnalytics.productGroupsCount;
  const shopRevenuesByPaymentStatus = shopAnalytics.shopRevenuesByPaymentStatus;
  return (
    <div className="my-4 w-full">
      <div className="text-darkGold my-2">Overview</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard2 title="Product Sold" value={productSold} />
        {Object.keys(ordersCountByStatus).map((key) => (
          <StatCard2
            key={key}
            title={`${capitalizeFirstLetter(key)} Orders`}
            value={ordersCountByStatus[key as keyof typeof ordersCountByStatus]}
          />
        ))}
      </div>
      <div className="flex flex-col my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ShopSalesCount productGroupsCount={productGroupsCount} />
          <ShopSalesRevenue
            shopRevenuesByPaymentStatus={shopRevenuesByPaymentStatus}
          />
        </div>
      </div>
     
    </div>
  );
};

export default ShopOverview;
