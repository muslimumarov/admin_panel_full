import useListQuery from "../../../core/hooks/useListQuery.ts";
import { MAX_LIMIT } from "../../../core/constants/page.constants.ts";
import { useTranslation } from "react-i18next";
import { SelectInterface } from "../../../core/interfaces/select.interface.ts";
import { useMemo } from "react";
import get from "lodash/get";
import { PositionInterface } from "../../position/interfaces/position.interface.ts";
import { POSITION_QUERY_KEY } from "../../position/contants/position.constants.ts";

const usePositions = () => {
  const { i18n } = useTranslation();
  const { query } = useListQuery<PositionInterface>({
    url: [POSITION_QUERY_KEY],
    params: { limit: MAX_LIMIT },
  });

  console.log("from api server", query);

  const positions = useMemo<SelectInterface[]>(
    () =>
      query.data?.data?.map((position) => ({
        value: position.id,
        label: get(position.translations, `${i18n.language}.title`, ""),
      })) || [],
    [query.data, i18n.language],
  );

  return {
    positions,
  };
};

export default usePositions;
