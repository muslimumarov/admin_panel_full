import { JSX, memo } from "react";
import DataTable, { DatatableProps } from "./DataTable.tsx";

const MemorizedDatatable = memo(DataTable) as <TData>(
  props: DatatableProps<TData>,
) => JSX.Element;

export default MemorizedDatatable;
