import { useState } from "react";
import { Label, FileInput } from "flowbite-react";

interface FileUploadWithSizeProps {
  sizeInKB?: number | null;
}

const FileUploadWithSize: React.FC = () => {
  const [fileSize, setFileSize] =
    useState<FileUploadWithSizeProps["sizeInKB"]>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const sizeInKB = parseFloat((file.size / 1024).toFixed(2));
      setFileSize(sizeInKB);
    } else {
      setFileSize(null);
    }
  };

  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="file-upload" value="Upload file" />
      </div>
      <FileInput id="file-upload" onChange={handleFileChange} />

      {fileSize !== null && (
        <div className="mt-2">
          <Label value={`Fayl hajmi: ${fileSize} KB`} />
        </div>
      )}
    </div>
  );
};

export default FileUploadWithSize;
