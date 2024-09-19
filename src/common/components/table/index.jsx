import React, { useMemo, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

import Button from "components/button";

import { classNames } from "common/utils";

const Table = ({
  data = [],
  header: tableHeader = [],
  loading = false,
  search = false,
  totalElements,
  serverPagination = false,
  perPage = 10,
  onPaginate = () => {},
  border = true,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const onNextPage = () => {
    if (currentPage <= Math.ceil((totalElements || data.length) / perPage) - 1) {
      setCurrentPage((prevState) => prevState + 1);
      onPaginate(currentPage);
    }
  };

  const onPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevState) => prevState - 1);
      onPaginate(currentPage);
    }
  };

  const sliced = useMemo(() => {
    if (!serverPagination) {
      return data?.slice(
        (currentPage - 1) * perPage,
        (currentPage - 1) * perPage + perPage,
      );
    } else {
      return data;
    }
  }, [currentPage, perPage, totalElements]);

  return (
    <>
      <div
        className={classNames(
          border ? "border border-[#E3E3E6]" : "",
          "table-wrapper max-w-full overflow-x-auto rounded-lg bg-white",
        )}
      >
        <div className="table w-full">
          <div className="table-parent w-full">
            <table className="w-full overflow-x-auto px-5">
              <thead className={classNames(search ? "border-t-[1px]" : "")}>
                <tr className="border-b-[1px] pb-10">
                  {tableHeader?.map((item) => (
                    <th
                      key={item?.name}
                      scope="col"
                      className={classNames(
                        item?.sticky ? "sticky right-0 bg-white" : "", // Add "sticky right-0" class conditionally
                        "whitespace-nowrap border-b-[1px] border-b-gray-100 bg-[#4146560A] px-5 py-1.5 text-[13px] font-medium text-gray-700",
                      )}
                    >
                      <div className="flex gap-3 text-left">
                        <span className="whitespace-nowrap text-[13px] font-medium capitalize text-gray-500 opacity-80">
                          {item?.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="gap-4 divide-y divide-gray-100" key={currentPage}>
                {sliced?.map((item, idx) => {
                  return (
                    <tr key={idx} className="even:bg-[#41465608]">
                      {tableHeader?.map((col, i) => {
                        return col?.show === false ? null : (
                          <td
                            key={i}
                            className={classNames(
                              col?.sticky ? "sticky right-0 bg-white text-center" : "",
                              "relative whitespace-nowrap py-[10.5px] px-5 text-[13px] font-medium text-gray-700",
                            )}
                            style={{ zIndex: col?.sticky ? perPage * 2 - idx : "" }}
                          >
                            {col?.sticky ? (
                              <div className="absolute left-0 top-0 h-[58px] w-[1px] bg-[#eee]" />
                            ) : null}
                            {item
                              ? typeof col?.render === "function"
                                ? col?.accessor !== "*"
                                  ? col?.render(item[col?.accessor])
                                  : col?.render(item)
                                : item[col?.accessor]
                              : null}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {(data?.length > perPage || totalElements > perPage) && loading === false ? (
        <div className="sticky left-0 mt-5 flex w-full items-center justify-end gap-7 text-right">
          <div className="mr-auto flex gap-3"></div>
          {data?.length > perPage || totalElements > perPage ? (
            <div className="flex gap-3">
              <Button onClick={onPreviousPage} disabled={currentPage <= 1}>
                <div className="5 flex gap-1">
                  {currentPage <= 1 ? (
                    <ArrowLeftIcon width={14} />
                  ) : (
                    <ArrowLeftIcon width={14} />
                  )}
                  <span>Back</span>
                </div>
              </Button>
              <Button
                onClick={onNextPage}
                disabled={currentPage * perPage >= data?.length}
              >
                <div className="flex gap-1.5">
                  <span>Next</span>
                  {currentPage * perPage >= data?.length ? (
                    <ArrowRightIcon width={14} />
                  ) : (
                    <ArrowRightIcon width={14} />
                  )}
                </div>
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Table;
