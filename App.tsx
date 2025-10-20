import React from 'react';
import { FileUploader } from './components/FileUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Spinner } from './components/Spinner';
import { APP_METADATA, BUTTON_LABELS } from './constants';
import { useImageProcessor } from './hooks/useImageProcessor';
import { ProcessingStatus } from './types';

const App: React.FC = () => {
  const {
    originalFile,
    originalPreviewUrl,
    processedImageUrl,
    status,
    error,
    handleFileSelect,
    handleProcessImage,
    handleDownload,
    handleShare,
    handleReset,
  } = useImageProcessor();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 font-sans text-autumn-brown">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-autumn-brown leading-tight">
            {APP_METADATA.TITLE}
          </h1>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg text-autumn-orange">
            {APP_METADATA.DESCRIPTION}
          </p>
          <p className="mt-1 text-sm text-gray-600">{APP_METADATA.SUBTITLE}</p>
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-300">
          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
              role="alert"
            >
              <p className="font-bold">エラー</p>
              <p>{error}</p>
            </div>
          )}

          {!originalFile && <FileUploader onFileSelect={handleFileSelect} />}

          {originalFile && (
            <div className="flex flex-col gap-6 sm:gap-8">
              <div
                className={`grid grid-cols-1 ${
                  processedImageUrl ? 'sm:grid-cols-2' : ''
                } gap-4 sm:gap-6 items-start`}
              >
                {originalPreviewUrl && (
                  <ImageDisplay src={originalPreviewUrl} alt="元の画像" title="オリジナル" />
                )}
                {status === ProcessingStatus.Loading && (
                  <div className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-full">
                    <Spinner />
                    <p className="mt-4 text-base sm:text-lg">秋風に加工中...</p>
                  </div>
                )}
                {processedImageUrl && (
                  <ImageDisplay
                    src={processedImageUrl}
                    alt="秋風フィルター適用後"
                    title="秋風バージョン"
                  />
                )}
              </div>

              <div className="flex flex-col items-stretch gap-3 mt-2 sm:mt-4">
                {status === ProcessingStatus.Idle && (
                  <>
                    <button
                      onClick={handleProcessImage}
                      className="w-full bg-autumn-orange hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 px-8 rounded-full transition duration-200 shadow-md active:scale-95 touch-manipulation"
                    >
                      {BUTTON_LABELS.PROCESS}
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 font-bold py-3 px-8 rounded-full transition duration-200 touch-manipulation"
                    >
                      {BUTTON_LABELS.CHANGE_IMAGE}
                    </button>
                  </>
                )}
                {status === ProcessingStatus.Loading && (
                  <button
                    disabled
                    className="w-full bg-autumn-orange/70 text-white font-bold py-4 px-8 rounded-full cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Spinner /> {BUTTON_LABELS.PROCESSING}
                  </button>
                )}
                {status === ProcessingStatus.Success && (
                  <>
                    <button
                      onClick={handleShare}
                      className="w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-bold py-4 px-8 rounded-full transition duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 touch-manipulation"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </svg>
                      {BUTTON_LABELS.SHARE}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-bold py-4 px-8 rounded-full transition duration-200 shadow-md active:scale-95 touch-manipulation"
                    >
                      {BUTTON_LABELS.DOWNLOAD}
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full bg-autumn-orange hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-200 touch-manipulation"
                    >
                      {BUTTON_LABELS.PROCESS_ANOTHER}
                    </button>
                  </>
                )}
                {status === ProcessingStatus.Error && (
                  <button
                    onClick={handleReset}
                    className="w-full bg-autumn-orange hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-4 px-8 rounded-full transition duration-200 shadow-md active:scale-95 touch-manipulation"
                  >
                    {BUTTON_LABELS.RETRY}
                  </button>
                )}
              </div>
            </div>
          )}
        </main>

        <footer className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500 px-2">
          <p>Powered by Google Gemini 🍂</p>
          <p className="mt-1 text-xs text-gray-400">※モバイル専用アプリです</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
