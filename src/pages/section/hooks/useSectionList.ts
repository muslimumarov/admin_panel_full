import { useCallback, useMemo } from "react";
import { createSectionColumns } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { SectionInterface } from "../interfaces/section.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { SECTION_QUERY_KEY } from "../contants/section.constants.ts";
import { Language } from "../../../core/enums/Language.ts";

const useSectionList = () => {
  const { t, i18n } = useTranslation();

  const { query, handleFilter } = useList<SectionInterface>([
    SECTION_QUERY_KEY,
  ]);
  const { remove } = useDelete([SECTION_QUERY_KEY]);

  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );
  const columns = useMemo(
    () => createSectionColumns(t, handleDelete, i18n.language as Language),
    [t, handleDelete, i18n.language],
  );

  return {
    columns,
    dataSource: query.data,
    handleFilter,
  };
};

export default useSectionList;
