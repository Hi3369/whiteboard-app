const Toolbar = ({ tool, setTool, color, setColor, strokeWidth, setStrokeWidth, onClear }) => {
  return (
    <div className="toolbar">
      <button
        className={tool === 'pen' ? 'active' : ''}
        onClick={() => setTool('pen')}
      >
        ✏️ ペン
      </button>
      
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        title="色を選択"
      />
      
      <label>
        太さ: {strokeWidth}px
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
        />
      </label>
      
      <button onClick={onClear}>
        🗑️ クリア
      </button>
    </div>
  )
}

export default Toolbar