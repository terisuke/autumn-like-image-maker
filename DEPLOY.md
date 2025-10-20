# 🚀 デプロイガイド

このガイドでは、秋風画像メーカーをVercelにデプロイする手順を説明します。

## 📋 前提条件

- [Vercel](https://vercel.com/)のアカウント
- [Google AI Studio](https://aistudio.google.com/)のAPIキー
- GitHubアカウント（リポジトリ連携のため）

## 🔑 Gemini API Keyの取得

1. [Google AI Studio](https://aistudio.google.com/)にアクセス
2. 「Get API Key」をクリック
3. 新しいAPIキーを作成
4. キーをコピーして安全な場所に保存

## 📦 Vercelへのデプロイ手順

### 方法1: Vercel Dashboard経由（推奨）

1. **Vercelにログイン**
   - [Vercel Dashboard](https://vercel.com/dashboard)にアクセス

2. **新規プロジェクトを作成**
   - 「Add New...」→「Project」をクリック
   - GitHubリポジトリを選択

3. **プロジェクト設定**
   - **Framework Preset**: Viteを選択（自動検出されるはず）
   - **Root Directory**: `.` (デフォルト)
   - **Build Command**: `npm run build` (デフォルト)
   - **Output Directory**: `dist` (デフォルト)

4. **環境変数を設定**
   - 「Environment Variables」セクションで以下を追加：
     ```
     Name: GEMINI_API_KEY
     Value: (取得したAPIキー)
     ```
   - すべての環境（Production, Preview, Development）にチェック

5. **デプロイ**
   - 「Deploy」ボタンをクリック
   - 数分待つとデプロイ完了

### 方法2: Vercel CLI経由

```bash
# Vercel CLIをインストール（未インストールの場合）
npm install -g vercel

# ログイン
vercel login

# プロジェクトディレクトリで実行
vercel

# 環境変数を設定
vercel env add GEMINI_API_KEY

# 本番環境にデプロイ
vercel --prod
```

## 🔄 継続的デプロイ

GitHubリポジトリと連携した場合、以下の動作になります：

- **mainブランチへのpush** → 本番環境に自動デプロイ
- **その他のブランチへのpush** → プレビュー環境に自動デプロイ
- **Pull Request作成** → プレビュー環境のURLが自動コメント

## 🛠️ デプロイ後の設定

### カスタムドメインの設定（オプション）

1. Vercel Dashboardでプロジェクトを開く
2. 「Settings」→「Domains」
3. カスタムドメインを追加

### 環境変数の更新

1. Vercel Dashboardでプロジェクトを開く
2. 「Settings」→「Environment Variables」
3. 変数を編集または追加
4. 再デプロイが必要な場合は「Deployments」タブから最新のデプロイを再実行

## 📱 PWA対応（オプション）

アプリアイコンを追加する場合：

1. 以下のファイルを`public/`ディレクトリに追加：
   - `icon-192x192.png` (192x192px)
   - `icon-512x512.png` (512x512px)
   - `apple-touch-icon.png` (180x180px)
   - `og-image.png` (1200x630px、SNSシェア用)

2. 再デプロイ

## ⚠️ 注意事項

### セキュリティ

- ✅ `.env.local`は`.gitignore`に含まれており、GitHubにはコミットされません
- ✅ APIキーはVercelの環境変数として安全に管理されます
- ❌ APIキーをコードに直接書き込まないでください

### API制限

- Gemini APIには無料枠があります
- 大量のアクセスがある場合は、使用量を監視してください
- [Google AI Studio](https://aistudio.google.com/)で使用量を確認できます

### パフォーマンス

- 初回アクセス時は画像の読み込みに時間がかかる場合があります
- モバイルデバイスでの使用を推奨しています

## 🐛 トラブルシューティング

### デプロイが失敗する

- ビルドログを確認してエラーメッセージを確認
- 環境変数が正しく設定されているか確認
- `npm run build`がローカルで成功するか確認

### 画像処理が動作しない

- Vercelの環境変数に`GEMINI_API_KEY`が設定されているか確認
- APIキーが有効か確認
- ブラウザのコンソールでエラーメッセージを確認

### CSSが表示されない

- ビルドが正常に完了しているか確認
- Viteの設定が正しいか確認
- キャッシュをクリアして再読み込み

## 📞 サポート

問題が解決しない場合は、GitHubのIssueを作成してください。

---

Happy Deploying! 🍂
