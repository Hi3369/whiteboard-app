# Online Whiteboard App

A real-time collaborative whiteboard application built with React and AWS WebSocket API.

## 🎨 Features

- **Real-time Drawing**: Draw collaboratively with multiple users in real-time
- **Pen Tool**: Adjustable color and stroke width (1-20px)
- **🧽 Eraser Tool**: Remove drawings with adjustable eraser size (1-50px)
- **🖼️ Persistent Canvas**: Drawings remain visible across browser sessions and resizes
- **Clear Canvas**: Clear the entire whiteboard for all users
- **Responsive Design**: Works on desktop and mobile devices
- **Touch Support**: Native touch support for mobile drawing
- **Live User Count**: See how many users are currently connected
- **🎨 Dynamic Cursors**: Visual feedback with tool-specific cursors

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Canvas**: HTML5 Canvas API
- **Real-time Communication**: WebSocket
- **Backend**: AWS Lambda + API Gateway WebSocket
- **Database**: AWS DynamoDB
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🚀 Live Demo

**✅ ライブアプリケーション**: [https://hi3369.github.io/whiteboard-app/](https://hi3369.github.io/whiteboard-app/)

複数のブラウザタブで開いて、リアルタイム描画機能をお試しください！

## 🏗️ Architecture

```
Frontend (React)     WebSocket API Gateway     Lambda Functions
     │                        │                        │
     │── Drawing Events ──────│────── Process ─────────│
     │                        │                        │
     │── User Actions ────────│────── Broadcast ───────│
     │                        │                        │
     │── Real-time Sync ──────│────── DynamoDB ────────│
```

## 🎯 Usage

1. **✏️ Drawing**: Select pen tool, choose color, and click & drag to draw on the canvas
2. **🧽 Erasing**: Select eraser tool and drag over areas to remove drawings
3. **🎨 Color Selection**: Click the color picker to change pen color (disabled during eraser mode)
4. **📏 Tool Size**: Use the slider to adjust pen thickness (1-20px) or eraser size (1-50px)
5. **🗑️ Clear Canvas**: Click the clear button to reset the entire whiteboard for all users
6. **👥 Multi-user**: Share the URL with others for real-time collaborative drawing
7. **🔄 Persistent Canvas**: Your drawings automatically save and sync across all connected users

## 🔧 Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Hi3369/whiteboard-app.git
cd whiteboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🌐 WebSocket Connection

The app connects to AWS WebSocket API Gateway for real-time communication:
- **Production**: `wss://h16tuvno9d.execute-api.ap-northeast-3.amazonaws.com/prod`
- **Development**: `ws://localhost:8080`

WebSocket URL is automatically selected based on `NODE_ENV` environment variable.

## 📱 Mobile Support

The application is fully responsive and supports touch gestures on mobile devices:
- Touch to draw
- Pinch to zoom (browser native)
- Responsive toolbar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with React and Vite
- Powered by AWS serverless infrastructure
- Deployed on GitHub Pages

---

## 🔧 Deployment Information

**GitHub Actions**: 自動デプロイ設定済み
- ワークフロー: `.github/workflows/deploy.yml`
- トリガー: `main` ブランチへの push
- 重要な設定変更:
  - `npm ci` → `npm install` (package-lock.json不要)
  - npmキャッシュ無効化

**AWS Infrastructure**: 
- CDK Stack: `WhiteboardInfrastructureStack`
- WebSocket API: API Gateway + Lambda
- Database: DynamoDB (`whiteboard-connections`)

**Note**: このリポジトリはフロントエンドクライアントです。バックエンドインフラはAWS CDKで別途デプロイされています。