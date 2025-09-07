import { AddShop } from "@/components/shop/AddShop";
import { ShopInterface } from "@/interface/interface";
import { shortenLongString } from "@/utils/helpers";
import { useState } from "react";

const ShopInfo = ({ shop }: { shop: ShopInterface }) => {
  const [viewAll, setViewAll] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 text-black rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:text-white dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold text-primary">Shop Info</h5>
        <div className="flex items-center gap-2">
          <div
            onClick={() => setViewAll(!viewAll)}
            className="text-sm font-medium text-info hover:underline cursor-pointer"
          >
            {viewAll ? "View Less" : "View All"}
          </div>
          <div
            onClick={() => setOpenModal(!openModal)}
            className="text-sm font-medium text-warning hover:underline cursor-pointer"
          >
            {openModal ? "Close Edit" : "Edit"}
          </div>
        </div>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Shop Name</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {shop?.shopName || "N/A"}
              </div>
            </div>
          </li>

          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Shop Id</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {shop?.shopId || "N/A"}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Tailor</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {shop?.isTailor ? "Yes" : "No"}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Shoe Maker</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {shop?.isShoeMaker ? "Yes" : "No"}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>MakeUp Artist</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {shop?.isMakeUpArtist ? "Yes" : "No"}
              </div>
            </div>
          </li>

          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Email</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {shop?.email || "N/A"}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div>Phone</div>
              <div
                className=" text-slate-500 dark:text-slate-300
                    "
              >
                {shop?.phoneNumber || "N/A"}
              </div>
            </div>
          </li>
          {viewAll && (
            <>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Address</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {shop?.address || "N/A"}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Region</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {shop?.region || "N/A"}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Country</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {shop?.country || "N/A"}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Twitter</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                    "
                  >
                    {shop?.social?.twitter
                      ? shortenLongString(shop?.social?.twitter, 20)
                      : "N/A"}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Facebook</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                        "
                  >
                    {shop?.social?.facebook
                      ? shortenLongString(shop?.social?.facebook, 20)
                      : "N/A"}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Instagram</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                        "
                  >
                    {shop?.social?.instagram
                      ? shortenLongString(shop?.social?.instagram, 20)
                      : "N/A"}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>LinkedIn</div>
                  <div
                    className=" text-slate-500 dark:text-slate-300
                        "
                  >
                    {shop?.social?.linkedin
                      ? shortenLongString(shop?.social?.linkedin, 20)
                      : "N/A"}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center justify-between">
                  <div>Website</div>
                  <a
                    className="text-slate-500 dark:text-slate-300"
                    href={shop?.social?.website}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {shop?.social?.website
                      ? shortenLongString(shop?.social?.website, 20)
                      : "N/A"}
                  </a>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
      {openModal && (
        <AddShop
          shop={shop}
          mode="edit"
          setOpenModal={setOpenModal}
          openModal={openModal}
        />
      )}
    </div>
  );
};

export default ShopInfo;
