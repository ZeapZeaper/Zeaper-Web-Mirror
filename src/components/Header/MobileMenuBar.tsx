"use client";

import { menuLinks } from "@/data/content";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { toCamelCaseWithoutSpaces } from "@/utils/helpers";
// import Image from "next/image";
// import NoPic from "@/images/noPhoto.png";
import pluralize from "pluralize";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Drawer } from "flowbite-react";

const drawerTheme = {
  root: {
    base: "fixed z-60 overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 ",

    edge: "bottom-16",
    position: {
      left: {
        on: "left-0 top-0 h-screen w-screen transform-none ",
        off: "left-0 top-0 h-screen w-screen -translate-x-full",
      },
    },
  },
};

interface Option {
  count: number;
  [key: string]: string | number | boolean;
}

interface ProductTypeOption extends Option {
  value: string;
}

interface ProductTypeFilter extends Filter {
  options: ProductTypeOption[];
}
interface Filter {
  name: string;
  values: string[];
}
interface MenuChildrenInterface {
  link: string;
  fields: ProductTypeFilter[];
}

const MobileMenuBar = ({ onClickClose }: { onClickClose: () => void }) => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>(
    undefined
  );

  const [menuChildren, setMenuChildren] = useState<MenuChildrenInterface[]>([]);

  const allProductsDynamicFiltersQuery =
    zeapApiSlice.useGetProductsDynamicFiltersQuery({}, { skip: !token });
  const allProductsDynamicFilters =
    allProductsDynamicFiltersQuery?.data?.data || [];

  const productTypes: string[] =
    allProductsDynamicFilters
      ?.find(
        (filter: Filter): filter is ProductTypeFilter =>
          filter.name === "Product Type"
      )
      ?.options?.filter((opt: ProductTypeOption) => opt?.count > 0)
      ?.map((item: ProductTypeOption) => item.value) || [];

  const [trigger] = zeapApiSlice.useLazyGetProductsDynamicFiltersQuery();

  useEffect(() => {
    if (token) {
      menuLinks.forEach((menu) => {
        const link = menu.link;
        trigger(
          {
            productType: toCamelCaseWithoutSpaces(link),
          },
          true
        )
          .unwrap()
          .then((result) => {
            const data = result?.data;
            const newStateObj = {
              link,
              fields: data,
            };
            setMenuChildren((state) => [...state, newStateObj]);
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div
      className="flex flex-col h-full gap-4"
      onMouseLeave={() => setSelectedMenu(undefined)}
    >
      <div className="flex flex-col divide-y divide-slate-200 ">
        {menuLinks.map((menu) => (
          <React.Fragment key={menu.link}>
            {productTypes.includes(menu.link) && (
              <MenuItem
                link={menu.link}
                setSelectedMenu={setSelectedMenu}
                selectedMenu={selectedMenu || ""}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {selectedMenu !== undefined && (
        <Drawer
          open={selectedMenu !== undefined}
          onClose={() => setSelectedMenu(undefined)}
          theme={drawerTheme}
          backdrop={false}
        >
          <Drawer.Header
            title={pluralize(selectedMenu).toUpperCase()}
            titleIcon={() => <></>}
          />
          {/* <div>
            <Image
              src={
                menuLinks.find((menu) => menu.link === selectedMenu)?.image ||
                NoPic
              }
              alt="category"
              width={300}
              height={300}
              objectFit="cover"
            />
          </div> */}
          <Drawer.Items>
            <div className="flex flex-col gap-4 xl:gap-8 w-full ">
              <MenuItemChildren
                onClickClose={onClickClose}
                menuChildren={
                  menuChildren.filter((menu) => menu.link === selectedMenu) ||
                  []
                }
                setSelectedMenu={setSelectedMenu}
              />
            </div>
          </Drawer.Items>
        </Drawer>
      )}
    </div>
  );
};

export default MobileMenuBar;

const MenuItem = ({
  link,
  setSelectedMenu,
  selectedMenu,
}: {
  link: string;
  setSelectedMenu: (link: string) => void;
  selectedMenu: string;
}) => {
  return (
    <>
      {" "}
      <div
        className={`p-1 text-md text-slate-800 font-[510]  p-4 flex justify-between items-center h-full    ${
          selectedMenu === link ? " bg-slate-200 " : ""
        }`}
        onMouseEnter={() => setSelectedMenu(link)}
      >
        <span>{pluralize(link).toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </>
  );
};
const MenuItemChildren = ({
  menuChildren,
  setSelectedMenu,
  onClickClose,
}: {
  menuChildren: MenuChildrenInterface[];
  onClickClose: () => void;
  setSelectedMenu: (link: string | undefined) => void;
}) => {
  const excludedOptions = ["Other", "None"];
  const link = menuChildren[0]?.link;
  const fields = menuChildren[0]?.fields || [];
  const allowedFields = fields.filter(
    (field) =>
      field.name.toLowerCase() === "main" ||
      field.name.toLowerCase() === "style" ||
      field.name.toLowerCase() === "design" ||
      field.name.toLowerCase() === "brand" ||
      field.name.toLowerCase() === "occasion" ||
      // field.name.toLowerCase() === "heel type" ||
      field.name.toLowerCase() === "accessory type"
  );
  const getFormattedFields = (field: ProductTypeFilter) => {
    const options = [...field.options];
    return options
      .sort((a, b) => b.count - a.count)
      .filter((opt) => !excludedOptions.includes(opt.value))
      .slice(0, 10);
  };

  return (
    <div className="flex flex-col gap-8 justify-between  ">
      {allowedFields?.length > 0 &&
        allowedFields.map((field: ProductTypeFilter) => {
          const formattedFields = getFormattedFields(field);
          return (
            formattedFields.length > 0 && (
              <div key={field.name} className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-slate-800">
                  {field.name.toUpperCase()}
                </h3>
                <div className="flex flex-col gap-4  divide-y divide-slate-200">
                  {formattedFields.map((opt) => (
                    <Link
                      onClick={() => {
                        setSelectedMenu(undefined);
                        localStorage.setItem("selectedMenuChild", opt.value);
                        onClickClose();
                      }}
                      href={`/products/collections/${link}?${field.name.toLowerCase()}=${
                        opt.value
                      }`}
                      key={opt.value}
                      className="text-md text-start hover:border-b-2 hover:border-primary"
                    >
                      {opt.value}
                    </Link>
                  ))}
                </div>
              </div>
            )
          );
        })}
    </div>
  );
};
