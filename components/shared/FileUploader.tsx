import React, { Dispatch, SetStateAction } from 'react';
import { UploadDropzone } from "@uploadthing/react";
import type { FileWithPath } from '@uploadthing/react';
import { generateClientDropzoneAccept } from 'uploadthing/client';

type FileUploaderProps = {
  imageUrl: string;
  onFieldChange: (url: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

const FileUploader: React.FC<FileUploaderProps> = ({ imageUrl, onFieldChange, setFiles }) => {
  const onDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  };

  return (
    <UploadDropzone
      onDrop={onDrop}
      accept={generateClientDropzoneAccept(['image/*'])}
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
      onUploadBegin={(name) => {
        console.log("Uploading: ", name);
      }}
    >
      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex-center flex-col py-5 text-grey-500">
          <img src="/assets/icons/upload.svg" width={77} height={77} alt="file upload" />
          <h3 className="mb-2 mt-2">Drag photo here</h3>
          <p className="p-medium-12 mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Select from computer
          </Button>
        </div>
      )}
    </UploadDropzone>
  );
};

export default FileUploader;
