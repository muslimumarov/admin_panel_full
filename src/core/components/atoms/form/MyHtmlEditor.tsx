import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { InputProps } from "../../../interfaces/input-props.interface.ts";
import { Label } from "flowbite-react";

const TextEditorContainer = styled.div`
  .quill {
    .ql {
      &-toolbar {
        border-top-right-radius: 0.75rem;
        border-top-left-radius: 0.75rem;
      }
      &-container {
        border-top: 1px solid theme("colors.gray.200") !important;
        border-bottom-right-radius: 0.75rem;
        border-bottom-left-radius: 0.75rem;
        min-height: 120px;
        overflow-y: auto;
      }

      &-editor {
        min-height: 120px;
      }
    }
  }
`;

export type MyHtmlEditorProps<T extends FieldValues> = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "size" | "className"
> &
  InputProps<T> & {
    className?: string;
    containerClassName?: string;
    defaultValue?: PathValue<T, Path<T>>;
  };

const MyHtmlEditor = <T extends FieldValues>({
  error,
  label,
  control,
  name,
  className,
  containerClassName,
  required,
  ...props
}: MyHtmlEditorProps<T>) => {
  return (
    <TextEditorContainer className={`${containerClassName} dark:text-white`}>
      <Label color={error ? "failure" : "default"}>
        {label && (
          <div className={"mb-2 "}>
            {label} {required && <span className={"text-red-600"}>*</span>}
          </div>
        )}
      </Label>
      {control && name && (
        <Controller
          control={control}
          name={name}
          {...props}
          render={({ field }) => (
            <>
              <ReactQuill
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"], // toggled buttons
                    ["blockquote", "code-block"],
                    ["link", "image", "video", "formula"],

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [
                      { list: "ordered" },
                      { list: "bullet" },
                      { list: "check" },
                    ],
                    [{ script: "sub" }, { script: "super" }], // superscript/subscript
                    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
                    [{ direction: "rtl" }], // text direction

                    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ["clean"],
                  ],
                }}
                theme="snow"
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                {...field}
                className={twMerge([
                  `rounded-xl focus-within:ring-2 focus-within:ring-blue-600`,
                  error &&
                    "bg-red-50 !ring-1 !ring-red-400 focus-within:!ring-2",
                  className,
                ])}
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
    </TextEditorContainer>
  );
};

export default MyHtmlEditor;
