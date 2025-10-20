# 🚀 GitHub公開とVercelデプロイのセットアップガイド

このガイドでは、プロジェクトをGitHubに公開し、Vercelにデプロイするまでの手順を説明します。

## ⚠️ 事前確認

### 1. APIキーの確認

`.env.local`ファイルにAPIキーが含まれている場合、**絶対にGitにコミットしないでください**。

```bash
# .env.localが.gitignoreに含まれているか確認
cat .gitignore | grep "\.env\.local"
```

`*.local`または`.env.local`が表示されればOKです。

### 2. .env.localを削除または移動（推奨）

安全のため、一時的に.env.localを移動します：

```bash
# バックアップを作成
cp .env.local ~/.env.local.backup

# または別の安全な場所に移動
mv .env.local ~/Desktop/.env.local.backup
```

## 📦 Step 1: Gitリポジトリの初期化

```bash
# 現在のディレクトリで実行
cd /Users/teradakousuke/Developer/autumn-like-image-maker

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング（.gitignoreのファイルは自動的に除外されます）
git add .

# 初回コミット
git commit -m "feat: 初回コミット - 秋風画像メーカーの実装完了"
```

### 確認: .env.localが追跡されていないことを確認

```bash
git status
```

`.env.local`が表示されなければOKです。もし表示された場合：

```bash
# .env.localを追跡から除外
git rm --cached .env.local
git commit -m "chore: .env.localを追跡から除外"
```

## 🌐 Step 2: GitHubリポジトリの作成

### GitHubで新規リポジトリを作成

1. [GitHub](https://github.com/)にログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ情報を入力：
   - **Repository name**: `autumn-like-image-maker`（または任意の名前）
   - **Description**: `AIで写真を秋の雰囲気に変換するモバイルWebアプリ 🍂`
   - **Public**を選択
   - ✅ **Add a README file**: チェックを外す（既にREADME.mdがあるため）
   - ✅ **Add .gitignore**: チェックを外す（既に.gitignoreがあるため）
   - ✅ **Choose a license**: MITを選択（または任意）

4. 「Create repository」をクリック

### ローカルリポジトリをGitHubに接続

GitHubで表示される指示に従って実行：

```bash
# リモートリポジトリを追加（URLは自分のリポジトリに置き換える）
git remote add origin https://github.com/yourusername/autumn-like-image-maker.git

# ブランチ名をmainに変更（必要な場合）
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

### 🎉 完了！

GitHubでリポジトリが公開されました。

## 🚀 Step 3: Vercelへのデプロイ

### 方法1: Vercel Dashboard（推奨）

1. **Vercelにログイン**
   - [Vercel](https://vercel.com/)にアクセス
   - GitHubアカウントでログイン

2. **新規プロジェクトをインポート**
   - 「Add New...」→「Project」をクリック
   - 「Import Git Repository」で先ほど作成したリポジトリを選択
   - 「Import」をクリック

3. **プロジェクト設定**
   
   以下の設定は自動検出されるはずです：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **環境変数を設定**
   
   「Environment Variables」セクションで：
   
   ```
   Name: GEMINI_API_KEY
   Value: (あなたのGemini APIキー)
   ```
   
   - すべての環境（Production, Preview, Development）にチェック
   - 「Add」をクリック

5. **デプロイ**
   - 「Deploy」ボタンをクリック
   - 数分待つとデプロイ完了
   - デプロイされたURLが表示されます

6. **URLをREADMEに追加**
   
   ```bash
   # README.mdを編集してデプロイURLを追加
   # デモセクションを更新
   git add README.md
   git commit -m "docs: デプロイURLをREADMEに追加"
   git push
   ```

### 方法2: Deploy Buttonを使用

README.mdの「Deploy with Vercel」ボタンをクリックして、指示に従ってください。

## ✅ デプロイ後の確認

1. **動作確認**
   - デプロイされたURLにモバイルデバイスでアクセス
   - 画像をアップロードして変換をテスト
   - シェア機能をテスト

2. **カスタムドメインの設定（オプション）**
   - Vercel Dashboard →「Settings」→「Domains」
   - カスタムドメインを追加

3. **analytics設定（オプション）**
   - Vercel Dashboard →「Analytics」
   - アクセス解析を有効化

## 🔄 継続的デプロイ

これ以降、GitHubにpushするだけで自動的にVercelにデプロイされます：

```bash
# コード変更後
git add .
git commit -m "feat: 新機能を追加"
git push

# Vercelが自動的にデプロイします
```

- **mainブランチ**: 本番環境に自動デプロイ
- **その他のブランチ**: プレビュー環境に自動デプロイ

## 🔒 セキュリティチェックリスト

- [ ] `.env.local`が`.gitignore`に含まれている
- [ ] `.env.local`がGitリポジトリに追跡されていない
- [ ] GitHubリポジトリに`.env.local`がコミットされていない
- [ ] Vercelの環境変数にAPIキーが設定されている
- [ ] APIキーがコードに直接書かれていない

## 📞 問題が発生した場合

- [DEPLOY.md](./DEPLOY.md)のトラブルシューティングを確認
- GitHubのIssueを作成
- Vercelのサポートに問い合わせ

---

おめでとうございます！🎉 あなたのアプリが公開されました！

