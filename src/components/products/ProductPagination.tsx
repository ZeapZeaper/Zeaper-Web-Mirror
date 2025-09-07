import { Pagination } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ProductPagination = ({
  totalCount,
  limit,
  pageNumber,
  showIcons = true,
}: {
  totalCount: number;
  limit: number;
  pageNumber: number;
  showIcons?: boolean;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const changePage = (page: number) => {
    console.log("page", page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", `${page}`);
    // window.history.replaceState(null, "", `?${params.toString()}`);
    router.push(`?${params.toString()}`);
  };
  return (
    <>
      {" "}
      <Pagination
        currentPage={pageNumber ? pageNumber : 1}
        totalPages={Math.ceil(totalCount / limit)}
        onPageChange={(page) => {
          console.log("page", page);
          changePage(page);
        }}
        showIcons={showIcons}
      />
    </>
  );
};

export default ProductPagination;
