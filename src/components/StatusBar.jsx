const StatusBar = ({ isConnected, userCount }) => {
  return (
    <div className="status">
      <span
        className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}
      ></span>
      {isConnected ? 'オンライン' : 'オフライン'} • {userCount}人が接続中
    </div>
  )
}

export default StatusBar