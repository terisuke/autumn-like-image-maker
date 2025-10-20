export const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const SHARE_TEXT = 'AIで写真を秋風に加工しました！ #秋は俺が作る';

export const ERROR_MESSAGES = {
  INVALID_FILE_TYPE: 'ファイル形式が無効です。JPEG, PNG, または WEBP 形式の画像をアップロードしてください。',
  PROCESSING_ERROR: '処理中に不明なエラーが発生しました。',
  API_KEY_MISSING: 'API_KEY environment variable not set',
  NO_PROCESSED_IMAGE: 'APIの応答に処理済みの画像が見つかりませんでした。',
  API_PROCESSING_FAILED: 'AIによる画像の処理に失敗しました。しばらくしてからもう一度お試しください。',
  FILE_READ_FAILED: 'ファイルのデータURLとしての読み込みに失敗しました。',
} as const;

export const APP_METADATA = {
  TITLE: '秋風画像メーカー',
  DESCRIPTION: 'AIであなたの写真を素敵な秋の雰囲気に変身させましょう。',
  SUBTITLE: 'モバイルで撮った写真をワンタップで秋色に変換',
} as const;

export const BUTTON_LABELS = {
  PROCESS: '秋風に加工する',
  PROCESSING: '処理中...',
  DOWNLOAD: '画像をダウンロード',
  SHARE: 'Xでシェア',
  CHANGE_IMAGE: '画像を変更',
  PROCESS_ANOTHER: '別の画像を加工',
  RETRY: '再試行',
} as const;

