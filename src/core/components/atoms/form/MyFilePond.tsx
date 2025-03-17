import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { FilePondFile } from "filepond";
import { twMerge } from "tailwind-merge";
import { Controller, FieldValues } from "react-hook-form";
import { get, isArray } from "lodash";
import { InputProps } from "../../../interfaces/input-props.interface.ts";
import { FileInputProps, Label, useThemeMode } from "flowbite-react";
import styled from "styled-components";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import { ThemeMode } from "../../../enums/ThemeMode.ts";

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
);

const FilePondContainer = styled.div<{ $invalid: boolean; $mode: string }>`
  .filepond {
    &--drop-label {
      color: ${({ $invalid, $mode }) =>
        $invalid
          ? "#e02424"
          : $mode === ThemeMode.DARK
            ? "#fff"
            : "#4f4f4f"} !important;
    }
    &--root {
      margin-bottom: 0.5rem;
      border-radius: 0.75rem;
      outline: 1px solid
        ${({ $invalid }) => ($invalid ? "#f98080" : "transparent")};
    }

    &--panel {
      border-radius: 0.8rem;
      overflow: hidden;
    }

    &--drip {
      border: 1px solid #d1d5db;
      background-color: ${({ $invalid, $mode }) =>
        $invalid ? "#fdf2f2" : $mode === ThemeMode.DARK ? "#292A2D" : "#fff"};
      opacity: 1;
      border-radius: 0.75rem;
    }
  }

  &:focus-within {
    .filepond {
      &--root {
        outline: 2px solid
          ${({ $invalid }) => ($invalid ? "#f98080" : "#1f64f2")};
      }
    }
  }
`;

export type MyFilePondProps<T extends FieldValues> = InputProps<T> &
  Omit<
    FileInputProps,
    "size" | "className" | "onChange" | "placeholder" | "accept"
  > & {
    className?: string;
    server?: string;
    maxFiles?: number;
    accept?: string[];
    isMulti?: boolean;
    maxFileSize?: string;
    placeholder?: string | null;
    onChange?: (files: FilePondFile[]) => void;
    beforeRemoveFile?: (file: unknown) => void;
    containerClassName?: string;
  };

const MyFilePond = <T extends FieldValues>({
  control,
  error,
  isMulti = false,
  maxFiles = 1,
  accept,
  name,
  label,
  placeholder,
  className = "",
  maxFileSize = "10MB",
  required,
  onChange,
  containerClassName,
  beforeRemoveFile,
  ...computedProps
}: MyFilePondProps<T>) => {
  const { mode } = useThemeMode();

  return (
    <FilePondContainer
      $invalid={!!error}
      className={containerClassName}
      $mode={mode}
    >
      <Label color={error ? "failure" : "default"}>
        {label && (
          <div className={"mb-2"}>
            {label}{" "}
            {required && <span className={"bg-red-50 text-red-600"}>*</span>}
          </div>
        )}
      </Label>
      {control && name && (
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <>
              <FilePond
                files={
                  field.value
                    ? isArray(field.value)
                      ? field.value
                      : [field.value]
                    : []
                }
                name={field.name}
                {...computedProps}
                className={twMerge(["mb-0 rounded-xl", className])}
                onupdatefiles={(files = []) => {
                  if (maxFiles > 1) {
                    field.onChange(
                      files.map((file) => get(file, "source") as File | string),
                    );
                  } else {
                    field.onChange(get(files, "[0].source", undefined));
                  }
                  if (onChange) {
                    onChange(files);
                  }
                }}
                beforeRemoveFile={(item: FilePondFile) => {
                  if (beforeRemoveFile) {
                    beforeRemoveFile(item.source);
                  }
                  return true;
                }}
                maxFiles={maxFiles}
                allowMultiple={isMulti}
                allowImagePreview
                allowFileTypeValidation
                acceptedFileTypes={accept}
                labelIdle={placeholder || ""}
                credits={false}
                instantUpload={false}
                maxFileSize={maxFileSize}
                allowFileSizeValidation
              />
              {error && (
                <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-500">
                  {error}
                </p>
              )}
            </>
          )}
        />
      )}
    </FilePondContainer>
  );
};

export default MyFilePond;
