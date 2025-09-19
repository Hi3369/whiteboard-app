const Toolbar = ({ tool, setTool, color, setColor, strokeWidth, setStrokeWidth, onClear }) => {
  return (
    <div className="toolbar">
      <button
        className={tool === 'pen' ? 'active' : ''}
        onClick={() => setTool('pen')}
        title="ペンツール"
      >
        ✏️ ペン
      </button>
      
      <button
        className={tool === 'eraser' ? 'active' : ''}
        onClick={() => setTool('eraser')}
        title="消しゴムツール"
      >
        🧽 消しゴム
      </button>
      
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        title="色を選択"
        disabled={tool === 'eraser'}
        style={{ opacity: tool === 'eraser' ? 0.5 : 1 }}
      />
      
      <label>
        {tool === 'eraser' ? '消しゴムサイズ' : '太さ'}: {strokeWidth}px
        <input
          type="range"
          min="1"
          max={tool === 'eraser' ? '50' : '20'}
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
        />
      </label>
      
      <button onClick={onClear} title="キャンバスをクリア">
        🗑️ クリア
      </button>
    </div>
  )
}

export default Toolbar