# Online Whiteboard App

A real-time collaborative whiteboard application built with React and AWS WebSocket API.

## 🎨 Features

- **Real-time Drawing**: Draw collaboratively with multiple users in real-time
- **Pen Tool**: Adjustable color and stroke width
- **Clear Canvas**: Clear the entire whiteboard for all users
- **Responsive Design**: Works on desktop and mobile devices
- **Touch Support**: Native touch support for mobile drawing
- **Live User Count**: See how many users are currently connected

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Canvas**: HTML5 Canvas API
- **Real-time Communication**: WebSocket
- **Backend**: AWS Lambda + API Gateway WebSocket
- **Database**: AWS DynamoDB
- **Hosting**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🚀 Live Demo

Visit the live application: [https://your-username.github.io/whiteboard-app/](https://your-username.github.io/whiteboard-app/)

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

1. **Drawing**: Click and drag to draw on the canvas
2. **Color Selection**: Click the color picker to change pen color
3. **Stroke Width**: Use the slider to adjust line thickness
4. **Clear Canvas**: Click the clear button to reset the whiteboard
5. **Multi-user**: Share the URL with others for collaborative drawing

## 🔧 Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/whiteboard-app.git
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

The app connects to AWS WebSocket API Gateway for real-time communication. In development mode, it attempts to connect to `ws://localhost:8080` for local testing.

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

**Note**: This is the frontend client. The backend infrastructure is deployed separately on AWS using Lambda functions and API Gateway.