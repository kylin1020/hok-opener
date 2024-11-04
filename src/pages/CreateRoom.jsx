import { useState } from 'react';

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 创建成功后跳转到新房间
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">创建新房间</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="输入房间名称"
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          创建房间
        </button>
      </form>
    </div>
  );
} 