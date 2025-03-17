import { useCallback, useMemo } from "react";
import { createChatColumns, createChatFilters } from "../helpers";
import { useTranslation } from "react-i18next";
import useList from "../../../core/hooks/useList.ts";
import { ChatInterface } from "../interfaces/chat.interface.ts";
import useDelete from "../../../core/hooks/api/useDelete.ts";
import { Url } from "../../../core/hooks/api/useApi.ts";
import { CHAT_QUERY_KEY } from "../contants/Chat.constants.ts";
import { useNavigate } from "react-router-dom";

const useChatList = () => {
  const { t } = useTranslation();

  const { query, handleFilter } = useList<ChatInterface>([CHAT_QUERY_KEY]);
  const { remove } = useDelete([CHAT_QUERY_KEY]);
  const navigate = useNavigate();
  const handleDelete = useCallback(
    (id: Url) => {
      remove(id).then(() => {
        query.refetch();
      });
    },
    [remove],
  );
  const handleRowClick = (item: ChatInterface) => {
    navigate(`/${CHAT_QUERY_KEY}/view/${item.id}`);
  };
  const columns = useMemo(() => createChatColumns(t), [t, handleDelete]);
  const filters = useMemo(() => createChatFilters(t), [t]);

  return {
    columns,
    dataSource: query.data,
    filters,
    handleFilter,
    handleRowClick,
  };
};

export default useChatList;
