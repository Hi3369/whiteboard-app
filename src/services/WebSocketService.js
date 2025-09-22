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
      // GitHub Pagesで確実にプロダクション環境を検出
      const isProduction = window.location.hostname === 'hi3369.github.io' || 
                          window.location.protocol === 'https:' ||
                          process.env.NODE_ENV === 'production'
      
      const wsUrl = isProduction
        ? 'wss://nxbn89t806.execute-api.ap-northeast-3.amazonaws.com/prod'
        : 'ws://localhost:8080'
      
      console.log('Connecting to WebSocket:', wsUrl, 'isProduction:', isProduction)
      
      this.ws = new WebSocket(wsUrl)
      
      this.ws.onopen = () => {
        console.log('WebSocket connected successfully to:', wsUrl)
        this.isConnected = true
        this.reconnectAttempts = 0
        this.callbacks.onConnect?.()
        
        // 接続成功後、既存描画をリクエスト
        setTimeout(() => {
          this.requestExistingDrawings()
        }, 500)
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
        console.error('WebSocket error connecting to:', wsUrl, error)
      }
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
      this.handleReconnect()
    }
  }

  handleMessage(data) {
    // データの形式を確認
    if (!data || typeof data !== 'object') {
      console.warn('Invalid message format received:', data)
      return
    }

    // typeが未定義の場合のデバッグ情報
    if (data.type === undefined) {
      console.warn('Message with undefined type received:', JSON.stringify(data))
      return
    }

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
      case 'ping':
        // サーバーからのpingメッセージ（接続テスト用）- 特に処理不要
        console.log('Received ping from server')
        break
      default:
        console.log('Unknown message type:', data.type, 'Full message:', JSON.stringify(data))
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
    console.log('sendDrawData called - isConnected:', this.isConnected, 'readyState:', this.ws?.readyState)
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        action: 'draw',
        drawData: drawData
      }
      console.log('Sending draw message:', message)
      this.ws.send(JSON.stringify(message))
      console.log('Draw message sent successfully')
    } else {
      console.log('Cannot send draw message - WebSocket not ready')
    }
  }

  sendClearCanvas() {
    console.log('sendClearCanvas called - isConnected:', this.isConnected, 'readyState:', this.ws?.readyState)
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        action: 'clear'
      }
      console.log('Sending clear message:', message)
      this.ws.send(JSON.stringify(message))
      console.log('Clear message sent successfully')
    } else {
      console.log('Cannot send clear message - WebSocket not ready')
    }
  }

  requestExistingDrawings() {
    console.log('requestExistingDrawings called - isConnected:', this.isConnected, 'readyState:', this.ws?.readyState)
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        action: 'getExistingDrawings'
      }
      console.log('Requesting existing drawings:', message)
      this.ws.send(JSON.stringify(message))
      console.log('Existing drawings request sent successfully')
    } else {
      console.log('Cannot request existing drawings - WebSocket not ready')
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