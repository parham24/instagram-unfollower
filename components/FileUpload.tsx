
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface FileUploadProps {
  title: string;
  onFileSelect: (file: File) => void;
  isLoaded: boolean;
  fileId: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ title, onFileSelect, isLoaded, fileId }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const baseClasses = "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300";
  const idleClasses = "bg-gray-800 border-gray-600 hover:bg-gray-700";
  const draggingClasses = "bg-purple-900/50 border-purple-500";
  const loadedClasses = "bg-green-900/50 border-green-500 cursor-not-allowed";

  const getDynamicClasses = () => {
    if (isLoaded) return `${baseClasses} ${loadedClasses}`;
    if (isDragging) return `${baseClasses} ${draggingClasses}`;
    return `${baseClasses} ${idleClasses}`;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <label
        htmlFor={fileId}
        className={getDynamicClasses()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          {isLoaded ? (
            <>
              <CheckCircleIcon className="w-10 h-10 mb-3 text-green-400" />
              <p className="mb-2 text-lg font-semibold text-green-300">بارگذاری شد!</p>
              <p className="text-sm text-gray-400">{title}</p>
            </>
          ) : (
            <>
              <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">{title}</span></p>
              <p className="text-xs text-gray-500">فایل را بکشید و رها کنید یا کلیک کنید</p>
            </>
          )}
        </div>
        <input id={fileId} type="file" className="hidden" onChange={handleFileChange} accept=".json" disabled={isLoaded} />
      </label>
    </div>
  );
};
