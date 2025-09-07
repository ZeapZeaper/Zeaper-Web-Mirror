"use client";

import { menuLinks } from "@/data/content";
import { globalSelectors } from "@/redux/services/global.slice";
import zeapApiSlice from "@/redux/services/zeapApi.slice";
import { toCamelCaseWithoutSpaces } from "@/utils/helpers";
import Image from "next/image";
import NoPic from "@/images/noPhoto.png";
import pluralize from "pluralize";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { ThemeContext } from "@/contexts/themeContext";

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

const DesktopMenuBar = () => {
  const { setDimBackground } = useContext(ThemeContext);
  const token = useSelector(globalSelectors.selectAuthToken);
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>(
    undefined
  );
  const [showMenuChildren, setShowMenuChildren] = useState<boolean>(false);
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

  useEffect(
    () => {
      setDimBackground(selectedMenu !== undefined);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedMenu]
  );

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
      className="flex flex-col h-full gap-4 "
      onMouseLeave={() => {
        setTimeout(() => {
          if (!showMenuChildren) {
            setSelectedMenu(undefined);
          }
        }, 500);
      }}
    >
      {/* <hr className="text-primary"/> */}
      <div className="flex justify-center gap-4 w-full">
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
        <div
          onMouseEnter={() => setShowMenuChildren(true)}
          onMouseLeave={() => {
            setSelectedMenu(undefined);
            setShowMenuChildren(false);
          }}
          // className="flex gap-6 z-100 p-4 w-full absolute left-0 top-40 bg-white shadow-lg"
          className="flex gap-6 z-100 p-4 w-full bg-white "
        >
          <div>
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
          </div>
          <div className="flex gap-1">
            <MenuItemChildren
              menuChildren={
                menuChildren.filter((menu) => menu.link === selectedMenu) || []
              }
              setSelectedMenu={setSelectedMenu}
            />
          </div>
        </div>
      )}
      {/* <hr className="text-slate-300"/> */}
    </div>
  );
};

export default DesktopMenuBar;

const MenuItem = ({
  link,
  setSelectedMenu,
  selectedMenu,
}: {
  link: string;
  setSelectedMenu: (link: string | undefined) => void;
  selectedMenu: string;
}) => {
  return (
    <>
      {" "}
      <Link
        href={`/products/collections/${link}`}
        className={`p-1 text-xs text-slate-800 font-[510] text-center   xl:w-[11rem] ${
          selectedMenu === link ? " bg-slate-200 " : ""
        }`}
        onClick={() => {
          setSelectedMenu(undefined);
          localStorage.setItem("selectedMenu", link);
          localStorage.removeItem("selectedMenuChild");
        }}
        onMouseEnter={() => setSelectedMenu(link)}
      >
        {pluralize(link).toUpperCase()}
      </Link>
    </>
  );
};
const MenuItemChildren = ({
  menuChildren,
  setSelectedMenu,
}: {
  menuChildren: MenuChildrenInterface[];
  setSelectedMenu: (link: string | undefined) => void;
}) => {
  const excludedOptions = ["Other", "None"];
  const link = menuChildren[0]?.link;
  const fields = menuChildren[0]?.fields || [];
 
  // const sortFieldsValueByCount = (fields: ProductTypeFilter[]) => {
  //   return fields.sort((a, b) => {
  //     return b.options[0].count - a.options[0].count;
  //   });
  // };
  const allowedFields = fields.filter(
    (field) =>
      field.name.toLowerCase() === "gender" ||
      field.name.toLowerCase() === "age group" ||
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
    <div className="flex    flex-wrap w-[80vw]">
      {allowedFields?.length > 0 &&
        allowedFields.map((field: ProductTypeFilter) => {
          const formattedFields = getFormattedFields(field);
          return (
            formattedFields.length > 0 && (
              <div key={field.name} className="flex flex-col gap-4 w-[10rem]">
                <p className="text-xs font-bold text-slate-800 ">
                  {field.name.toUpperCase()}
                </p>
                <div className="flex flex-col gap-4 max-h-[25rem] flex-wrap overflow-auto">
                  {formattedFields.map((opt) => (
                    <Link
                      onClick={() => {
                        setSelectedMenu(undefined);
                        localStorage.setItem("selectedMenuChild", opt.value);
                      }}
                      href={`/products/collections/${link}?${field.name.toLowerCase()}=${
                        opt.value
                      }`}
                      key={opt.value}
                      className="text-sm text-start  hover:border-b-2 hover:border-primary "
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
