class WebSocketService {
  constructor({ onConnect, onDisconnect, onUserCountUpdate, onDrawData }) {
    this.ws = null
    this.reconnectAttempts = 0
    this.maxReconnectAttempts = 5
    this.reconnectInterval = 3000
    this.isConnected = false
    
    this.callbacks = {
      onConnect,
      onDisconnect,
      onUserCountUpdate,
      onDrawData
    }

    this.connect()
  }

  connect() {
    try {
      const wsUrl = process.env.NODE_ENV === 'production' 
        ? 'wss://h16tuvno9d.execute-api.ap-northeast-3.amazonaws.com/prod'
        : 'ws://localhost:8080'
      
      this.ws = new WebSocket(wsUrl)
      
      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.isConnected = true
        this.reconnectAttempts = 0
        this.callbacks.onConnect?.()
      }
      
      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          this.handleMessage(data)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }
      
      this.ws.onclose = () => {
        console.log('WebSocket disconnected')
        this.isConnected = false
        this.callbacks.onDisconnect?.()
        this.handleReconnect()
      }
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
      this.handleReconnect()
    }
  }

  handleMessage(data) {
    switch (data.type) {
      case 'userCount':
        this.callbacks.onUserCountUpdate?.(data.count)
        break
      case 'draw':
        this.callbacks.onDrawData?.(data.drawData)
        break
      case 'clear':
        this.callbacks.onDrawData?.({ type: 'clear' })
        break
      default:
        console.log('Unknown message type:', data.type)
    }
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`)
      
      setTimeout(() => {
        this.connect()
      }, this.reconnectInterval)
    } else {
      console.log('Max reconnection attempts reached')
    }
  }

  sendDrawData(drawData) {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        action: 'draw',
        drawData: drawData
      }
      this.ws.send(JSON.stringify(message))
    }
  }

  sendClearCanvas() {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        action: 'clear'
      }
      this.ws.send(JSON.stringify(message))
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
      this.isConnected = false
    }
  }
}

export default WebSocketService