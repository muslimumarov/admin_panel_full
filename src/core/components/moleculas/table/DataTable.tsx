import { Pagination, Table } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import get from "lodash/get";
import { SortOrder } from "../../../enums/SortOrder.ts";
import { PaginationInterface } from "../../../interfaces/pagination.interface.ts";
import { DEFAULT_LIMIT } from "../../../constants/page.constants.ts";
import { MySelect } from "../../atoms/form";
import { ColumnType } from "./types/column.type.ts";

export interface FilterProps<TData> extends Record<string, unknown> {
  page: number;
  limit?: number;
  sortOrder?: SortOrder;
  sortField?: keyof TData;
}

export interface DatatableProps<TData> {
  dataSource?: PaginationInterface<TData>;
  columns: ColumnType<TData>[];
  className?: string;
  hasNumbers?: boolean;
  containerClassName?: string;
  rowKey: keyof TData;
  onRowClick?: (record: TData) => void;
  onParamChange?: (param: FilterProps<TData>) => void;
}

const DataTable = <TData,>({
  className,
  containerClassName,
  dataSource = {
    data: [],
    pagination: {
      page: 1,
      limit: DEFAULT_LIMIT,
      total: 0,
      totalPages: 0,
    },
  },
  columns = [],
  rowKey,
  onRowClick,
  hasNumbers = false,
  onParamChange,
}: DatatableProps<TData>) => {
  return (
    <div>
      <div
        className={twMerge([
          "overflow-x-auto rounded-lg border border-gray-300/50",
          containerClassName,
        ])}
      >
        <Table hoverable className={className}>
          <Table.Head>
            {hasNumbers && (
              <Table.HeadCell style={{ maxWidth: 50 }}>№</Table.HeadCell>
            )}
            {columns.map((column) => (
              <Table.HeadCell key={column.key} style={column.styles}>
                {column.name}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body>
            {dataSource.data?.map((item, index) => (
              <Table.Row
                key={get(item, rowKey)}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(item);
                  }
                }}
              >
                {hasNumbers && (
                  <Table.Cell style={{ maxWidth: 50 }}>
                    {index +
                      1 +
                      ((dataSource?.pagination?.page ?? 1) - 1) *
                        (dataSource?.pagination?.limit ?? DEFAULT_LIMIT)}
                  </Table.Cell>
                )}
                {columns.map((column) => (
                  <Table.Cell
                    className={"max-w-xs overflow-hidden text-ellipsis"}
                    style={column.styles}
                    key={`${index}-${column.key}`}
                  >
                    {column.render
                      ? column.render(get(item, column.dataIndex), item)
                      : get(item, column.dataIndex, "")}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className={"flex items-center justify-end gap-2"}>
        <MySelect
          defaultValue={dataSource?.pagination?.limit || DEFAULT_LIMIT}
          options={[
            { value: 10, label: 10 },
            { value: 20, label: 20 },
            { value: 50, label: 50 },
            { value: 100, label: 100 },
          ]}
          sizing={"sm"}
          className={"mt-2"}
          onChange={(event) => {
            if (onParamChange) {
              onParamChange({ page: 1, limit: parseInt(event.target.value) });
            }
          }}
        />
        <Pagination
          currentPage={dataSource?.pagination?.page || 1}
          totalPages={dataSource?.pagination?.totalPages || 0}
          onPageChange={(page) => {
            if (onParamChange) {
              onParamChange({ page });
            }
          }}
          previousLabel=""
          nextLabel=""
          showIcons
        />
      </div>
    </div>
  );
};

export default DataTable;
