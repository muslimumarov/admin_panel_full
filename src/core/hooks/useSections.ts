import useListQuery from "./useListQuery.ts";
import { MAX_LIMIT } from "../constants/page.constants.ts";
import { useTranslation } from "react-i18next";
import { SelectInterface } from "../interfaces/select.interface.ts";
import { useEffect, useMemo } from "react";
import get from "lodash/get";
import { Url } from "./api/useApi.ts";
import { SectionInterface } from "../../pages/section/interfaces/section.interface.ts";
import { SECTION_QUERY_KEY } from "../../pages/section/contants/section.constants.ts";

interface UseSectionProps {
  departmentId?: Url;
}

const useSections = ({ departmentId }: UseSectionProps) => {
  const { i18n } = useTranslation();
  const { query } = useListQuery<SectionInterface>({
    url: [SECTION_QUERY_KEY],
    params: { limit: MAX_LIMIT, departmentId },
  });

  useEffect(() => {
    query.refetch();
  }, [departmentId]);

  const sections = useMemo<SelectInterface[]>(
    () =>
      query.data?.data?.map((section) => ({
        value: section.id,
        label: get(section.translations, `${i18n.language}.title`, ""),
      })) || [],
    [query.data, i18n.language],
  );

  return {
    sections,
  };
};

export default useSections;
