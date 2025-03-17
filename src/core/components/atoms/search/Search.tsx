import { MyInput } from "../form";
import { useTranslation } from "react-i18next";
import useFilter from "../../../hooks/useFilter.tsx";
import { Button } from "flowbite-react";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";

interface SearchProps {
  name?: string;
}

const Search = ({ name = "text" }: SearchProps) => {
  const { t } = useTranslation();
  const { handleSetParams } = useFilter();
  const { register, handleSubmit, watch } = useForm<{ [key: string]: string }>({
    defaultValues: { [name]: "" },
    mode: "onSubmit",
  });
  watch(name);
  const onSubmit = (data: Record<string, string>) => {
    console.log(data);

    const query = data[name]?.trim();
    handleSetParams({ [name]: query });
  };

  return (
    <form
      className="flex max-w-screen-mobil330 gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <MyInput
        register={register}
        className="w-full shrink"
        name={name}
        type="search"
        placeholder={t("search")}
      />
      <Button size="sm" className="shrink-0" color="blue" type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
