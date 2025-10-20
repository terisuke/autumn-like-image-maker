import { useCallback, useEffect, useState } from 'react';
import { ERROR_MESSAGES, SHARE_TEXT, VALID_IMAGE_TYPES } from '../constants';
import { autumnifyImage } from '../services/geminiService';
import { ProcessingStatus } from '../types';
import { fileToBase64 } from '../utils/fileUtils';

interface UseImageProcessorReturn {
  originalFile: File | null;
  originalPreviewUrl: string | null;
  processedImageUrl: string | null;
  status: ProcessingStatus;
  error: string | null;
  handleFileSelect: (file: File) => void;
  handleProcessImage: () => Promise<void>;
  handleDownload: () => void;
  handleShare: () => Promise<void>;
  handleReset: () => void;
}

export const useImageProcessor = (): UseImageProcessorReturn => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.Idle);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!originalFile) {
      setOriginalPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(originalFile);
    setOriginalPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [originalFile]);

  const handleFileSelect = useCallback((file: File) => {
    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setError(ERROR_MESSAGES.INVALID_FILE_TYPE);
      return;
    }
    setError(null);
    setOriginalFile(file);
    setProcessedImageUrl(null);
    setStatus(ProcessingStatus.Idle);
  }, []);

  const handleProcessImage = useCallback(async () => {
    if (!originalFile) return;

    setStatus(ProcessingStatus.Loading);
    setError(null);
    setProcessedImageUrl(null);

    try {
      const { base64Data, mimeType } = await fileToBase64(originalFile);
      const processedBase64 = await autumnifyImage(base64Data, mimeType);
      setProcessedImageUrl(`data:image/png;base64,${processedBase64}`);
      setStatus(ProcessingStatus.Success);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : ERROR_MESSAGES.PROCESSING_ERROR);
      setStatus(ProcessingStatus.Error);
    }
  }, [originalFile]);

  const handleDownload = useCallback(() => {
    if (!processedImageUrl) return;
    const link = document.createElement('a');
    link.href = processedImageUrl;
    const fileName = originalFile?.name.replace(/\.[^/.]+$/, '') || 'image';
    link.download = `${fileName}-autumn.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [processedImageUrl, originalFile]);

  const handleShare = useCallback(async () => {
    if (!processedImageUrl) return;

    const fileName = originalFile?.name.replace(/\.[^/.]+$/, '-autumn.png') || 'autumn-image.png';

    try {
      const res = await fetch(processedImageUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: 'image/png' });

      // Web Share APIがファイル共有に対応しているかチェック
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          text: SHARE_TEXT,
        });
      } else {
        // Web Share APIが使えない場合のフォールバック（テキストのみ）
        const tweetText = encodeURIComponent(SHARE_TEXT);
        const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Share failed:', err);
      // エラー発生時もテキストのみで共有を試みる
      const tweetText = encodeURIComponent(SHARE_TEXT);
      const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [processedImageUrl, originalFile]);

  const handleReset = useCallback(() => {
    setOriginalFile(null);
    setOriginalPreviewUrl(null);
    setProcessedImageUrl(null);
    setStatus(ProcessingStatus.Idle);
    setError(null);
  }, []);

  return {
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
  };
};
