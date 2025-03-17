import useListQuery from "../../../core/hooks/useListQuery.ts";
import { MAX_LIMIT } from "../../../core/constants/page.constants.ts";
import { useTranslation } from "react-i18next";
import { SelectInterface } from "../../../core/interfaces/select.interface.ts";
import { useMemo } from "react";
import get from "lodash/get";
import { SectionInterface } from "../../section/interfaces/section.interface.ts";
import { SECTION_QUERY_KEY } from "../../section/contants/section.constants.ts";

interface UseSectionProps {
  departmentId?: number | null;
}

const useSections = ({ departmentId }: UseSectionProps) => {
  const { i18n } = useTranslation();

  const { query } = useListQuery<SectionInterface>({
    url: [SECTION_QUERY_KEY],
    params: {
      limit: MAX_LIMIT,
      departmentId: departmentId && departmentId != -1 ? departmentId : "null",
    },
  });

  const sections = useMemo<SelectInterface[]>(
    () =>
      query.data?.data?.map((section) => ({
        value: section.id,
        label: get(section.translations, `${i18n.language}.title`, ""),
      })) || [],
    [query.data, i18n.language],
  );

  return { sections };
};

export default useSections;
