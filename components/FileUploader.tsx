import React, { useCallback, useState } from 'react';
import { VALID_IMAGE_TYPES } from '../constants';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const uploaderClass = `flex flex-col items-center justify-center w-full h-64 border-4 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-autumn-orange bg-autumn-cream' : 'border-autumn-yellow/50 bg-autumn-bg hover:bg-autumn-cream'}`;

  return (
    <div
      className={uploaderClass}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 mb-4 text-autumn-orange"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-lg text-autumn-brown">
            <span className="font-semibold">クリックしてアップロード</span>またはドラッグ＆ドロップ
          </p>
          <p className="text-sm text-gray-500">JPEG, PNG, WEBP形式の画像</p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept={VALID_IMAGE_TYPES.join(',')}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};
