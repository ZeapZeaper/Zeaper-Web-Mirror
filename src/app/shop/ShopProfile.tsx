import { ShopInterface, UserInterface } from "@/interface/interface";
import ShopInfo from "./ShopInfo";
import UserInfo from "@/components/account/UserInfo";
import ShopBankDetails from "./ShopBankDetails";
import ShopPolicies from "./ShopPolicies";


const ShopProfile = ({
  user,
  shop,
}: {
  user: UserInterface;
  shop: ShopInterface;
}) => {
  return (
    <div className="my-4 flex flex-col gap-4 w-full">
      <UserInfo user={user} />
      <ShopInfo shop={shop} />
      <ShopPolicies shop={shop} />
      <ShopBankDetails shop={shop} />
    </div>
  );
};

export default ShopProfile;
