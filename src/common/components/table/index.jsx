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

  const totalPages = Math.ceil((totalElements || data.length) / perPage);

  return (
    <>
      <div
        className={classNames(
          border ? "border border-slate-200" : "",
          "max-w-full overflow-x-auto rounded-xl bg-white shadow-sm",
        )}
      >
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {tableHeader?.map((item) => (
                <th
                  key={item?.name}
                  scope="col"
                  className={classNames(
                    item?.sticky ? "sticky right-0 bg-slate-50" : "",
                    "whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500",
                  )}
                >
                  {item?.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100" key={currentPage}>
            {sliced?.length === 0 && (
              <tr>
                <td
                  colSpan={tableHeader.length}
                  className="px-5 py-12 text-center text-sm text-slate-400"
                >
                  Nema podataka
                </td>
              </tr>
            )}
            {sliced?.map((item, idx) => (
              <tr
                key={idx}
                className="group transition-colors duration-100 hover:bg-teal-50/40"
              >
                {tableHeader?.map((col, i) =>
                  col?.show === false ? null : (
                    <td
                      key={i}
                      className={classNames(
                        col?.sticky
                          ? "sticky right-0 bg-white group-hover:bg-teal-50/40"
                          : "",
                        "relative whitespace-nowrap px-5 py-3 text-sm text-slate-700",
                      )}
                      style={{ zIndex: col?.sticky ? perPage * 2 - idx : "" }}
                    >
                      {col?.sticky ? (
                        <div className="absolute left-0 top-0 h-full w-px bg-slate-100" />
                      ) : null}
                      {item
                        ? typeof col?.render === "function"
                          ? col?.accessor !== "*"
                            ? col?.render(item[col?.accessor])
                            : col?.render(item)
                          : item[col?.accessor]
                        : null}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(data?.length > perPage || totalElements > perPage) && !loading ? (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Stranica {currentPage} od {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={onPreviousPage}
              disabled={currentPage <= 1}
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
              <span>Nazad</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onNextPage}
              disabled={currentPage * perPage >= data?.length}
            >
              <span>Naprijed</span>
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Table;
