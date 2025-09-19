# オンラインホワイトボードアプリ

ReactとAWS WebSocket APIを使用したリアルタイム協業ホワイトボードアプリケーションです。

## 🎨 機能

- **リアルタイム描画**: 複数ユーザーとリアルタイムで協業描画
- **ペンツール**: 色と線の太さを調整可能
- **キャンバスクリア**: 全ユーザー向けにホワイトボードをクリア
- **レスポンシブデザイン**: デスクトップとモバイルデバイスに対応
- **タッチサポート**: モバイル描画用のネイティブタッチサポート
- **ライブユーザー数**: 現在接続中のユーザー数を表示

## 🛠️ 技術スタック

- **フロントエンド**: React 18 + Vite
- **キャンバス**: HTML5 Canvas API
- **リアルタイム通信**: WebSocket
- **バックエンド**: AWS Lambda + API Gateway WebSocket
- **データベース**: AWS DynamoDB
- **ホスティング**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🚀 ライブデモ

ライブアプリケーションにアクセス: [https://your-username.github.io/whiteboard-app/](https://your-username.github.io/whiteboard-app/)

## 🏗️ アーキテクチャ

```
フロントエンド (React)   WebSocket API Gateway   Lambda 関数
     │                        │                        │
     │── 描画イベント ─────────│────── 処理 ────────────│
     │                        │                        │
     │── ユーザーアクション ───│────── ブロードキャスト ─│
     │                        │                        │
     │── リアルタイム同期 ─────│────── DynamoDB ────────│
```

## 🎯 使用方法

1. **描画**: キャンバス上でクリック＆ドラッグして描画
2. **色選択**: カラーピッカーをクリックしてペンの色を変更
3. **線の太さ**: スライダーを使用して線の太さを調整
4. **キャンバスクリア**: クリアボタンをクリックしてホワイトボードをリセット
5. **マルチユーザー**: URLを他の人と共有して協業描画

## 🔧 ローカル開発

### 前提条件

- Node.js 18以上
- npm または yarn

### セットアップ

1. リポジトリをクローン:
```bash
git clone https://github.com/your-username/whiteboard-app.git
cd whiteboard-app
```

2. 依存関係をインストール:
```bash
npm install
```

3. 開発サーバーを起動:
```bash
npm run dev
```

4. ブラウザで `http://localhost:5173` にアクセス

### 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番用ビルド
- `npm run preview` - 本番ビルドをローカルでプレビュー
- `npm run lint` - ESLintを実行

## 🌐 WebSocket接続

アプリはリアルタイム通信のためにAWS WebSocket API Gatewayに接続します。開発モードでは、ローカルテスト用に `ws://localhost:8080` への接続を試行します。

## 📱 モバイルサポート

アプリケーションは完全にレスポンシブで、モバイルデバイスのタッチジェスチャーをサポートします：
- タッチして描画
- ピンチしてズーム（ブラウザネイティブ）
- レスポンシブツールバー

## 🤝 コントリビューション

1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはオープンソースで、[MIT License](LICENSE) の下で利用可能です。

## 🙏 謝辞

- React と Vite で構築
- AWS サーバーレスインフラストラクチャで稼働
- GitHub Pages でデプロイ

---

**注意**: これはフロントエンドクライアントです。バックエンドインフラストラクチャは、Lambda関数とAPI Gatewayを使用してAWS上に別途デプロイされています。