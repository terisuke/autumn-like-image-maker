# 🍂 秋風画像メーカー

AIを使ってあなたの写真を素敵な秋の雰囲気に変身させるモバイルWebアプリです。

## ✨ 特徴

- 📱 **モバイル専用設計** - スマートフォンでの使用に最適化
- 🎨 **AIによる高品質な変換** - Google Gemini 2.5 Flash Imageを使用
- 🚀 **簡単操作** - 写真をアップロードしてワンタップで秋色に変換
- 🐦 **X（Twitter）連携** - 加工した画像をハッシュタグ付きで直接シェア
- 💾 **ダウンロード機能** - 加工した画像を保存可能
- 🎯 **PWA対応** - ホーム画面に追加してアプリのように使用可能

## 🎯 対象ユーザー

このアプリは**モバイルデバイス（スマートフォン、タブレット）での使用を想定**しています。PCブラウザでも動作しますが、一部の共有機能（画像付きでのX投稿など）が制限される場合があります。

## 🚀 デモ

[https://autumn-like-image-maker.vercel.app/](https://autumn-like-image-maker.vercel.app/)

> 📱 **モバイルでアクセスしてください** - 最適な体験のためにスマートフォンやタブレットでの使用を推奨します

## 📱 使い方

1. **写真をアップロード** - スマートフォンで撮った写真やギャラリーから選択
2. **秋風に加工ボタンをタップ** - AIが自動的に秋の雰囲気に変換
3. **シェアまたはダウンロード** - X（Twitter）でシェアするか、デバイスに保存

### 共有機能について

- **モバイル**: 画像とハッシュタグ `#秋は俺が作る` + アプリURLを含めてX（Twitter）に投稿できます
- **PC**: テキスト（ハッシュタグ + URL）のみでX投稿画面が開きます（画像は手動でアップロードが必要）

> 💡 **シェア効果**: ツイート文にアプリURLが含まれるため、他のユーザーが簡単にアプリにアクセスできます

## 🛠️ 技術スタック

- **フロントエンド**: React 19 + TypeScript
- **ビルドツール**: Vite 6
- **スタイリング**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash Image API
- **ホスティング**: Vercel
- **PWA**: Web App Manifest + Service Worker対応予定

## 🏗️ プロジェクト構成

```plaintext
autumn-like-image-maker/
├── components/           # Reactコンポーネント
│   ├── ErrorBoundary.tsx # エラーハンドリング
│   ├── FileUploader.tsx  # ファイルアップロード
│   ├── ImageDisplay.tsx  # 画像表示
│   └── Spinner.tsx       # ローディング表示
├── hooks/                # カスタムフック
│   └── useImageProcessor.ts # 画像処理ロジック
├── services/             # 外部サービス連携
│   └── geminiService.ts  # Gemini API連携
├── utils/                # ユーティリティ関数
│   └── fileUtils.ts      # ファイル操作
├── constants.ts          # 定数定義
├── types.ts              # TypeScript型定義
├── App.tsx               # メインアプリコンポーネント
├── index.tsx             # エントリーポイント
├── index.html            # HTMLテンプレート
└── vercel.json           # Vercelデプロイ設定
```

## 📦 ローカル開発

### 前提条件

- Node.js 18以上
- Gemini API Key

### セットアップ

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/yourusername/autumn-like-image-maker.git
   cd autumn-like-image-maker
   ```

2. **依存関係をインストール**

   ```bash
   npm install
   ```

3. **環境変数を設定**

   `.env.local` ファイルを作成:

   ```bash
   cp .env.example .env.local
   ```

   `.env.local` を編集して、Gemini API Keyを設定:

   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

   APIキーの取得方法は [DEPLOY.md](./DEPLOY.md) を参照してください。

4. **開発サーバーを起動**

   ```bash
   npm run dev
   ```

   アプリは `http://localhost:3000` で起動します。

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist/` ディレクトリに出力されます。

## 🌐 GitHub公開とデプロイ

### GitHub公開の準備

詳細な手順は **[SETUP.md](./SETUP.md)** を参照してください。

クイックスタート：

```bash
# 1. Gitリポジトリを初期化
git init
git add .
git commit -m "feat: 初回コミット"

# 2. GitHubリポジトリに接続（URLは自分のリポジトリに置き換える）
git remote add origin https://github.com/yourusername/autumn-like-image-maker.git
git branch -M main
git push -u origin main
```

> **⚠️ 重要**: GitHubにpushする前に、`.env.local`が`.gitignore`に含まれていることを必ず確認してください。

### Vercelへのデプロイ

詳細なデプロイ手順は **[DEPLOY.md](./DEPLOY.md)** を参照してください。

#### クイックスタート

1. [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/autumn-like-image-maker)
2. 環境変数 `GEMINI_API_KEY` を設定
3. デプロイ完了！

または、[Vercel Dashboard](https://vercel.com/dashboard)からリポジトリをインポートしてデプロイできます。

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 クレジット

- **AI処理**: Google Gemini 2.5 Flash Image
- **フロントエンド**: React + Vite
- **UI**: Tailwind CSS
- **ホスティング**: Vercel

## ⚠️ セキュリティに関する重要な注意

### APIキーの管理

- ✅ `.env.local`は`.gitignore`に含まれており、自動的にGitから除外されます
- ✅ Vercelの環境変数として安全に管理してください
- ❌ **絶対に**APIキーをコードに直接書き込まないでください
- ❌ **絶対に**`.env.local`をGitにコミットしないでください

### `.env.local`が誤ってコミットされた場合

1. すぐにGemini APIキーを無効化
2. 新しいAPIキーを生成
3. Gitの履歴から削除:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch .env.local' \
   --prune-empty --tag-name-filter cat -- --all
   ```

## 📝 その他の注意事項

- このアプリはモバイルデバイスでの使用を推奨しています
- 画像処理にはインターネット接続が必要です
- Gemini API使用量には無料枠があります（詳細は[Google AI Studio](https://aistudio.google.com/)を確認）
- アップロードされた画像は処理後すぐに破棄され、サーバーには保存されません

## 🐛 バグ報告・機能リクエスト

Issue を作成してください。

---

Made with ❤️ and 🍂 by AI
