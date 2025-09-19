import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'

const Canvas = forwardRef(({ tool, color, strokeWidth, onDraw }, ref) => {
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState([])
  const [drawingHistory, setDrawingHistory] = useState([])

  useImperativeHandle(ref, () => ({
    drawFromRemote: (drawData) => {
      const ctx = ctxRef.current
      if (!ctx) return

      if (drawData.type === 'clear') {
        const canvas = canvasRef.current
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setDrawingHistory([])
        return
      }

      // リモートの描画をhistoryに追加
      setDrawingHistory(prev => [...prev, drawData])

      if (drawData.type === 'path' && drawData.points.length > 1) {
        ctx.save()
        
        if (drawData.tool === 'eraser') {
          ctx.globalCompositeOperation = 'destination-out'
        } else {
          ctx.globalCompositeOperation = 'source-over'
          ctx.strokeStyle = drawData.color
        }
        
        ctx.lineWidth = drawData.strokeWidth
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
        ctx.beginPath()
        ctx.moveTo(drawData.points[0].x, drawData.points[0].y)
        
        for (let i = 1; i < drawData.points.length; i++) {
          ctx.lineTo(drawData.points[i].x, drawData.points[i].y)
        }
        
        ctx.stroke()
        ctx.restore()
      }
    },
    clear: () => {
      const ctx = ctxRef.current
      const canvas = canvasRef.current
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setDrawingHistory([])
      }
    },
    redrawAll: () => {
      const ctx = ctxRef.current
      const canvas = canvasRef.current
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      drawingHistory.forEach(drawData => {
        if (drawData.type === 'path' && drawData.points.length > 1) {
          ctx.save()
          
          if (drawData.tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out'
          } else {
            ctx.globalCompositeOperation = 'source-over'
            ctx.strokeStyle = drawData.color
          }
          
          ctx.lineWidth = drawData.strokeWidth
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          
          ctx.beginPath()
          ctx.moveTo(drawData.points[0].x, drawData.points[0].y)
          
          for (let i = 1; i < drawData.points.length; i++) {
            ctx.lineTo(drawData.points[i].x, drawData.points[i].y)
          }
          
          ctx.stroke()
          ctx.restore()
        }
      })
    }
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctxRef.current = ctx

    const resizeCanvas = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      // 画像をリサイズ後のキャンバスに復元
      if (imageData && drawingHistory.length > 0) {
        // 履歴から再描画
        ref.current?.redrawAll()
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [drawingHistory])

  const startDrawing = (e) => {
    if (tool !== 'pen' && tool !== 'eraser') return
    
    setIsDrawing(true)
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setCurrentPath([{ x, y }])
    
    const ctx = ctxRef.current
    ctx.save()
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.strokeStyle = color
    }
    
    ctx.lineWidth = strokeWidth
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing || (tool !== 'pen' && tool !== 'eraser')) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newPath = [...currentPath, { x, y }]
    setCurrentPath(newPath)
    
    const ctx = ctxRef.current
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    
    setIsDrawing(false)
    const ctx = ctxRef.current
    ctx.restore()
    
    if (currentPath.length > 1) {
      const drawData = {
        type: 'path',
        points: currentPath,
        color: color,
        strokeWidth: strokeWidth,
        tool: tool,
        timestamp: Date.now()
      }
      
      // 自分の描画もhistoryに追加
      setDrawingHistory(prev => [...prev, drawData])
      
      onDraw(drawData)
    }
    
    setCurrentPath([])
  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    canvasRef.current.dispatchEvent(mouseEvent)
  }

  const handleTouchMove = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    })
    canvasRef.current.dispatchEvent(mouseEvent)
  }

  const handleTouchEnd = (e) => {
    e.preventDefault()
    const mouseEvent = new MouseEvent('mouseup', {})
    canvasRef.current.dispatchEvent(mouseEvent)
  }

  return (
    <canvas
      ref={canvasRef}
      className={tool === 'eraser' ? 'eraser' : ''}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ display: 'block', backgroundColor: '#ffffff' }}
    />
  )
})

Canvas.displayName = 'Canvas'

export default Canvas