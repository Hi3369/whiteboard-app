import { useState, useRef, useEffect } from 'react'
import Canvas from './components/Canvas'
import Toolbar from './components/Toolbar'
import StatusBar from './components/StatusBar'
import WebSocketService from './services/WebSocketService'

function App() {
  const [tool, setTool] = useState('pen')
  const [color, setColor] = useState('#000000')
  const [strokeWidth, setStrokeWidth] = useState(3)
  const [isConnected, setIsConnected] = useState(false)
  const [userCount, setUserCount] = useState(1)
  const canvasRef = useRef(null)
  const wsService = useRef(null)

  useEffect(() => {
    wsService.current = new WebSocketService({
      onConnect: () => setIsConnected(true),
      onDisconnect: () => setIsConnected(false),
      onUserCountUpdate: (count) => setUserCount(count),
      onDrawData: (data) => {
        if (canvasRef.current) {
          canvasRef.current.drawFromRemote(data)
        }
      }
    })

    return () => {
      if (wsService.current) {
        wsService.current.disconnect()
      }
    }
  }, [])

  const handleDraw = (drawData) => {
    if (wsService.current && isConnected) {
      wsService.current.sendDrawData(drawData)
    }
  }

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear()
      if (wsService.current && isConnected) {
        wsService.current.sendClearCanvas()
      }
    }
  }

  return (
    <div className="app">
      <Toolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        onClear={clearCanvas}
      />
      <Canvas
        ref={canvasRef}
        tool={tool}
        color={color}
        strokeWidth={strokeWidth}
        onDraw={handleDraw}
      />
      <StatusBar
        isConnected={isConnected}
        userCount={userCount}
      />
    </div>
  )
}

export default App